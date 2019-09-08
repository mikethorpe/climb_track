using ClimbTrackApi.Domain.Models;
using ClimbTrackApi.Domain.Repositories;
using ClimbTrackApi.Domain.Services.Communication;
using Microsoft.AspNetCore.Identity;
using System;
using System.Threading.Tasks;

namespace ClimbTrackApi.Domain.Services
{
    public class AuthenticationService
    {
        private IPasswordHasher<User> _passwordHasher;
        private IUserRepository _userRepository;

        public AuthenticationService(IPasswordHasher<User> passwordHasher, IUserRepository userRepository)
        {
            _passwordHasher = passwordHasher;
            _userRepository = userRepository;
        }

        public ServiceResponse<AccessToken> CreateAccessTokenAsync(string emailAddress, string password)
        {

            try
            {
                var existingUser = _userRepository.FindByEmailAddress(emailAddress);

                if (existingUser == null) return new ServiceResponse<AccessToken>($"Error: cannot find user with email address: {emailAddress}");

                var passwordVerification =_passwordHasher.VerifyHashedPassword(existingUser, existingUser.Password, password);

                if (passwordVerification != PasswordVerificationResult.Success) return new ServiceResponse<AccessToken>($"Error: invalid credentials");


            }
            catch (Exception ex)
            {
                return new ServiceResponse<AccessToken>($"Error when creating authentication token: {ex.Message}");
            }

        }

    }
}
