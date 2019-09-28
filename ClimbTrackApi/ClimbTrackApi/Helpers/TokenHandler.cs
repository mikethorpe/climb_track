using ClimbTrackApi.Domain.Models;
using ClimbTrackApi.Domain.Repositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;

namespace ClimbTrackApi.Helpers
{
    public class TokenHandler: ITokenHandler
    {
        private IPasswordHasher<User> _passwordHasher;
        private IConfiguration _configuration; 
        private readonly SigningConfigurations _signingConfigurations;

        // grab these from the appsettings.json file
        // overwrite using env variables in production
        private const double ExpirationPeriodSeconds = 100;
        private const double AccessTokenExpirationPeriod = 200;

        public IRefreshTokenRepository _refreshTokenRepository { get; set; }
        public IUnitOfWork _unitOfWork { get; set; }
        public TokenHandler(IPasswordHasher<User> passwordHasher, IConfiguration configuration, IRefreshTokenRepository refreshTokenRepository, IUnitOfWork unitOfWork, SigningConfigurations signingConfigurations)
        {
            _passwordHasher = passwordHasher;
            _configuration = configuration;
            _refreshTokenRepository = refreshTokenRepository;
            _unitOfWork = unitOfWork;
            _signingConfigurations = signingConfigurations;
        }


        // tokens should be stored in db
        // probably should hash / encrypt the tokens as well
        // passwords should be encrypted on sending to the api
        public AccessToken GenerateAccessToken(User user)
        {
            var refreshToken = BuildRefreshToken(user);
            // TODO: Hash / encrypt refresh tokens
            _refreshTokenRepository.AddAsync(refreshToken);
            _unitOfWork.CompleteAsync();

            // Built after refresh token saved so has refresh token id
            var accessToken = BuildAccessToken(user, refreshToken);

            return accessToken;
        }

        private RefreshToken BuildRefreshToken(User user)
        {
            return new RefreshToken
            {
                Token = _passwordHasher.HashPassword(user, Guid.NewGuid().ToString()),
                Expiration = DateTime.UtcNow.AddSeconds(ExpirationPeriodSeconds),
                UserId = user.Id
            };
        }

        private AccessToken BuildAccessToken(User user, RefreshToken refreshToken)
        {
            var jwtConfigurationSection = _configuration.GetSection("TokenOptions");

            var accessTokenExpiration = DateTime.UtcNow.AddSeconds(AccessTokenExpirationPeriod);

            var securityToken = new JwtSecurityToken
            (
                issuer: jwtConfigurationSection.GetValue<string>("Issuer"),
                audience: jwtConfigurationSection.GetValue<string>("Audience"),
                claims: GetClaims(user),
                expires: accessTokenExpiration,
                notBefore: DateTime.UtcNow,
                signingCredentials: _signingConfigurations.SigningCredentials
            );

            var handler = new JwtSecurityTokenHandler();
            var accessToken = handler.WriteToken(securityToken);
            return new AccessToken(accessToken, accessTokenExpiration.Ticks, refreshToken);
        }

        private IEnumerable<Claim> GetClaims(User user)
        {
            //TODO: consider adding a list of roles
            return new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(JwtRegisteredClaimNames.Sub, user.EmailAddress),
                new Claim(ClaimTypes.Role, user.Role.ToString())
            };
        }

    }

    //TODO: extract this out into its own file
    public class SigningConfigurations
    {
        public SecurityKey Key { get; set; }
        public SigningCredentials SigningCredentials { get; set; }

        public SigningConfigurations()
        {
            using (var provider = new RSACryptoServiceProvider(2048))
            {
                Key = new RsaSecurityKey(provider.ExportParameters(true));
            }

            SigningCredentials = new SigningCredentials(Key, SecurityAlgorithms.RsaSha256Signature);
        }
    }
}
