using ClimbTrackApi.Persistence.Models;
using ClimbTrackApi.Persistence.Repositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Threading.Tasks;

namespace ClimbTrackApi.Domain.Services
{
    public class TokenHandler
    {
        private readonly IPasswordHasher<User> passwordHasher;
        private readonly IConfiguration configuration; 
        private readonly SigningConfigurations signingConfigurations;
        private readonly RefreshTokenRepository refreshTokenRepository;
        private readonly UnitOfWork UnitOfWork;

        public TokenHandler(IPasswordHasher<User> passwordHasher, IConfiguration configuration, RefreshTokenRepository refreshTokenRepository, UnitOfWork UnitOfWork, SigningConfigurations signingConfigurations)
        {
            this.passwordHasher = passwordHasher;
            this.configuration = configuration;
            this.refreshTokenRepository = refreshTokenRepository;
            this.UnitOfWork = UnitOfWork;
            this.signingConfigurations = signingConfigurations;
        }

        public async Task<AccessToken> GenerateAccessToken(User user)
        {
            var refreshToken = BuildRefreshToken(user);
            await refreshTokenRepository.AddAsync(refreshToken);
            await UnitOfWork.CompleteAsync();
            var accessToken = BuildAccessToken(user, refreshToken);
            return accessToken;
        }

        public async Task<RefreshToken> GetRefreshTokenAsync(string token)
        {
            if (string.IsNullOrWhiteSpace(token))
            {
                return null;
            }
            RefreshToken refreshToken = await refreshTokenRepository.FindByToken(token);

            if (refreshToken != null)
            {
                refreshTokenRepository.Remove(refreshToken);
            }
            await UnitOfWork.CompleteAsync();
            return refreshToken;
        }

        public async Task RevokeRefreshToken(string refreshToken)
        {
            var refreshTokenEntity = await refreshTokenRepository.FindByToken(refreshToken);
            refreshTokenRepository.Remove(refreshTokenEntity);
            await UnitOfWork.CompleteAsync();
        }

        private RefreshToken BuildRefreshToken(User user)
        {
            var jwtConfigurationSection = configuration.GetSection("TokenOptions");
            return new RefreshToken
            {
                Token = passwordHasher.HashPassword(user, Guid.NewGuid().ToString()),
                Expiration = DateTime.UtcNow.AddSeconds(jwtConfigurationSection.GetValue<int>("RefreshTokenExpirationMins")*60),
                UserId = user.Id
            };
        }

        private AccessToken BuildAccessToken(User user, RefreshToken refreshToken)
        {
            var jwtConfigurationSection = configuration.GetSection("TokenOptions");
            DateTime accessTokenExpiration = DateTime.UtcNow.AddSeconds(jwtConfigurationSection.GetValue<int>("AccessTokenExpirationMins")*60);
            var securityToken = new JwtSecurityToken
            (
                issuer: jwtConfigurationSection.GetValue<string>("Issuer"),
                audience: jwtConfigurationSection.GetValue<string>("Audience"),
                claims: GetClaims(user),
                expires: accessTokenExpiration,
                notBefore: DateTime.UtcNow,
                signingCredentials: signingConfigurations.SigningCredentials
            );
            var handler = new JwtSecurityTokenHandler();
            var accessToken = handler.WriteToken(securityToken);
            return new AccessToken(accessToken, accessTokenExpiration.Ticks, refreshToken);
        }

        private IEnumerable<Claim> GetClaims(User user)
        {
            return new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Sub, user.EmailAddress),
                new Claim(ClaimTypes.Role, user.Role.ToString())
            };
        }
    }
}
