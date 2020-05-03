using ClimbTrackApi.Auth.Interfaces;
using ClimbTrackApi.Auth.Models;
using ClimbTrackApi.Domain.Interfaces;
using ClimbTrackApi.Domain.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Threading.Tasks;

namespace ClimbTrackApi.Auth.Helpers
{
    public class TokenHandler: ITokenHandler
    {
        private IPasswordHasher<User> passwordHasher;
        private IConfiguration configuration; 
        private readonly SigningConfigurations signingConfigurations;
        public IRefreshTokenRepository refreshTokenRepository { get; set; }
        public IUnitOfWork unitOfWork { get; set; }

        public TokenHandler(IPasswordHasher<User> passwordHasher, IConfiguration configuration, IRefreshTokenRepository refreshTokenRepository, IUnitOfWork unitOfWork, SigningConfigurations signingConfigurations)
        {
            this.passwordHasher = passwordHasher;
            this.configuration = configuration;
            this.refreshTokenRepository = refreshTokenRepository;
            this.unitOfWork = unitOfWork;
            this.signingConfigurations = signingConfigurations;
        }

        // tokens should be stored in db
        // probably should hash / encrypt the tokens as well
        // passwords should be encrypted on sending to the api
        public AccessToken GenerateAccessToken(User user)
        {
            var refreshToken = BuildRefreshToken(user);
            // TODO: Hash / encrypt refresh tokens
            refreshTokenRepository.AddAsync(refreshToken);
            unitOfWork.CompleteAsync();
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

            // Refresh token is good for one use
            if (refreshToken != null) refreshTokenRepository.Remove(refreshToken);
            await unitOfWork.CompleteAsync();
            return refreshToken;
        }

        public async Task RevokeRefreshToken(string refreshToken)
        {
            var refreshTokenEntity = await refreshTokenRepository.FindByToken(refreshToken);
            refreshTokenRepository.Remove(refreshTokenEntity);
            await unitOfWork.CompleteAsync();
        }

        private RefreshToken BuildRefreshToken(User user)
        {
            var jwtConfigurationSection = configuration.GetSection("TokenOptions");
            return new RefreshToken
            {
                // why does this method take a user - would be nice to know?
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
