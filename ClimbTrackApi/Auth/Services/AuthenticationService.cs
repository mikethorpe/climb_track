using ClimbTrackApi.Auth.Interfaces;
using ClimbTrackApi.Auth.Models;
using ClimbTrackApi.Common.Communication;
using Microsoft.AspNetCore.Identity;
using System;
using System.Threading.Tasks;

namespace ClimbTrackApi.Auth.Services
{
    public class AuthenticationService: IAuthenticationService
    {
        private IPasswordHasher<User> _passwordHasher;
        private IUserRepository _userRepository;
        private ITokenHandler _tokenHandler;

        public AuthenticationService(IPasswordHasher<User> passwordHasher, IUserRepository userRepository,  ITokenHandler tokenHandler)
        {
            _passwordHasher = passwordHasher;
            _userRepository = userRepository;
            _tokenHandler = tokenHandler;
        }

        public async Task<ServiceResponse<AccessToken>> CreateAccessTokenAsync(string emailAddress, string password)
        {
            // TODO: wrap all in transaction to account for failures
            try
            {
                User existingUser = _userRepository.FindByEmailAddress(emailAddress);

                if (existingUser == null)
                {
                    return new ServiceResponse<AccessToken>($"Error: cannot find user with email address: {emailAddress}");
                }
                PasswordVerificationResult passwordVerification =_passwordHasher.VerifyHashedPassword(existingUser, existingUser.Password, password);
                if (passwordVerification == PasswordVerificationResult.Success)
                {
                    AccessToken token = _tokenHandler.GenerateAccessToken(existingUser);

                    // call save async here on the context here?
                    return new ServiceResponse<AccessToken>(token);
                }
                return new ServiceResponse<AccessToken>($"Error: invalid credentials");
            }
            catch (Exception ex)
            {
                return new ServiceResponse<AccessToken>($"Error when creating authentication token: {ex.Message}");
            }
        }

        public async Task<ServiceResponse<AccessToken>> RefreshTokenAsync(string refreshToken)
        {
            RefreshToken refreshTokenEntity = await _tokenHandler.GetRefreshTokenAsync(refreshToken);
            if (refreshTokenEntity == null)
            {
                return new ServiceResponse<AccessToken>("Invalid refresh token");
            }
            if (refreshTokenEntity.IsExpired())
            {
                return new ServiceResponse<AccessToken>("Refresh token expired");
            }
            User user = await _userRepository.FindByIdAsync(refreshTokenEntity.UserId);
            if (user == null)
            {
                return new ServiceResponse<AccessToken>("Invalid refresh token for user");
            }
            var accessToken = _tokenHandler.GenerateAccessToken(user);
            return new ServiceResponse<AccessToken>(accessToken);
        }

        public async Task<ServiceResponse<object>> RevokeRefreshTokenAsync(string refreshToken)
        {
            await _tokenHandler.RevokeRefreshToken(refreshToken);
            return new ServiceResponse<object>(new Object());
        }
    }
}
