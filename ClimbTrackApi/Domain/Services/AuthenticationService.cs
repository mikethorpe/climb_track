using ClimbTrackApi.Domain.Communication;
using ClimbTrackApi.Domain.Interfaces;
using ClimbTrackApi.Domain.Models;
using Microsoft.AspNetCore.Identity;
using System;
using System.Threading.Tasks;

namespace ClimbTrackApi.Domain.Services
{
    public class AuthenticationService
    {
        private readonly IPasswordHasher<User> passwordHasher;
        private readonly IUserRepository userRepository;
        private readonly TokenHandler tokenHandler;

        public AuthenticationService(IPasswordHasher<User> passwordHasher, IUserRepository userRepository,  TokenHandler tokenHandler)
        {
            this.passwordHasher = passwordHasher;
            this.userRepository = userRepository;
            this.tokenHandler = tokenHandler;
        }

        public async Task<ServiceResponse<AccessToken>> CreateAccessTokenAsync(string emailAddress, string password)
        {
            // TODO: wrap all in transaction to account for failures
            try
            {
                User existingUser = userRepository.FindByEmailAddress(emailAddress);

                if (existingUser == null)
                {
                    return new ServiceResponse<AccessToken>($"Error: cannot find user with email address: {emailAddress}");
                }
                PasswordVerificationResult passwordVerification =passwordHasher.VerifyHashedPassword(existingUser, existingUser.Password, password);
                if (passwordVerification == PasswordVerificationResult.Success)
                {
                    AccessToken token = tokenHandler.GenerateAccessToken(existingUser);

                    // call save async here on the context here?
                    return new ServiceResponse<AccessToken>(token);
                }
                return new ServiceResponse<AccessToken>($"Error: invalid credentials");
            }
            catch (Exception)
            {
                return new ServiceResponse<AccessToken>($"Error when creating authentication token");
            }
        }

        public async Task<ServiceResponse<AccessToken>> RefreshTokenAsync(string refreshToken)
        {
            RefreshToken refreshTokenEntity = await tokenHandler.GetRefreshTokenAsync(refreshToken);
            if (refreshTokenEntity == null)
            {
                return new ServiceResponse<AccessToken>("Invalid refresh token");
            }
            if (refreshTokenEntity.IsExpired())
            {
                return new ServiceResponse<AccessToken>("Refresh token expired");
            }
            User user = await userRepository.FindByIdAsync(refreshTokenEntity.UserId);
            if (user == null)
            {
                return new ServiceResponse<AccessToken>("Invalid refresh token for user");
            }
            var accessToken = tokenHandler.GenerateAccessToken(user);
            return new ServiceResponse<AccessToken>(accessToken);
        }

        public async Task<ServiceResponse<object>> RevokeRefreshTokenAsync(string refreshToken)
        {
            await tokenHandler.RevokeRefreshToken(refreshToken);
            return new ServiceResponse<object>(new Object());
        }
    }
}
