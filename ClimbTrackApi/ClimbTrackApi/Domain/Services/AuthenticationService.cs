using ClimbTrackApi.Domain.Models;
using ClimbTrackApi.Domain.Repositories;
using ClimbTrackApi.Domain.Services.Communication;
using ClimbTrackApi.Helpers;
using Microsoft.AspNetCore.Identity;
using System;
using System.Threading.Tasks;

namespace ClimbTrackApi.Domain.Services
{
    public class AuthenticationService: IAuthenticationService
    {
        private IPasswordHasher<User> _passwordHasher;
        private IUserRepository _userRepository;
        private ITokenHandler _tokenHandler;

        public AuthenticationService(
            IPasswordHasher<User> passwordHasher, 
            IUserRepository userRepository, 
            ITokenHandler tokenHandler)
        {
            _passwordHasher = passwordHasher;
            _userRepository = userRepository;
            _tokenHandler = tokenHandler;
        }

        public async Task<ServiceResponse<AccessToken>> CreateAccessTokenAsync(string emailAddress, string password)
        {

            try
            {
                var existingUser = _userRepository.FindByEmailAddress(emailAddress);

                if (existingUser == null) return new ServiceResponse<AccessToken>($"Error: cannot find user with email address: {emailAddress}");

                var passwordVerification =_passwordHasher.VerifyHashedPassword(existingUser, existingUser.Password, password);

                if (passwordVerification != PasswordVerificationResult.Success) return new ServiceResponse<AccessToken>($"Error: invalid credentials");

                var token = _tokenHandler.GenerateAccessToken(existingUser);

                return new ServiceResponse<AccessToken>(token);

            }
            catch (Exception ex)
            {
                return new ServiceResponse<AccessToken>($"Error when creating authentication token: {ex.Message}");
            }

        }

    }
}
