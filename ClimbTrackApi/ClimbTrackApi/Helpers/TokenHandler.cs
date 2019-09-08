using ClimbTrackApi.Domain.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;

namespace ClimbTrackApi.Helpers
{
    public class TokenHandler
    {
        private IPasswordHasher<User> _passwordHasher;
        private IConfiguration _configuration; 

        // grab these from the appsettings.json file
        // overwrite using env variables in production
        private const double ExpirationPeriodSeconds = 30;
        private const double AccessTokenExpirationPeriod = 60;

        public TokenHandler(IPasswordHasher<User> passwordHasher, IConfiguration configuration)
        {
            _passwordHasher = passwordHasher;
            _configuration = configuration;
        }


        // tokens should be stored in db
        // probably should hash / encrypt the tokens as well
        // passwords should be encrypted on sending to the api
        public AccessToken GenerateAccessToken(User user)
        {
            var refreshToken = BuildRefreshToken(user);
            var accessToken = BuildAccessToken(user, refreshToken);

            // TODO: add to list of valid refresh tokens in the db

            return accessToken;
        }

        private RefreshToken BuildRefreshToken(User user)
        {
            return new RefreshToken
            {
                Token = _passwordHasher.HashPassword(user, Guid.NewGuid().ToString()),
                Expiration = DateTime.UtcNow.AddSeconds(ExpirationPeriodSeconds)
            };
        }

        private AccessToken BuildAccessToken(User user, RefreshToken refreshToken)
        {
            var jwtConfigurationSection = _configuration.GetSection("JWTAuthorization");

            var accessTokenExpiration = DateTime.UtcNow.AddSeconds(AccessTokenExpirationPeriod);

            var securityToken = new JwtSecurityToken
            (
                issuer: jwtConfigurationSection.GetValue<string>("Issuer"),
                audience: jwtConfigurationSection.GetValue<string>("Audience"),
                claims: GetClaims(user),
                expires: accessTokenExpiration,
                notBefore: DateTime.UtcNow
                // TODO: add signing credentials
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

}
