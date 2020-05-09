using ClimbTrackApi.Domain.Communication;
using ClimbTrackApi.Persistence.Models;
using ClimbTrackApi.Persistence.Repositories;
using Microsoft.AspNetCore.Identity;
using System.Threading.Tasks;

namespace ClimbTrackApi.Domain.Services
{
    public class AuthenticationService
    {
        private readonly IPasswordHasher<User> passwordHasher;
        private readonly UserRepository userRepository;
        private readonly TokenHandler tokenHandler;

        public AuthenticationService(IPasswordHasher<User> passwordHasher, UserRepository userRepository,  TokenHandler tokenHandler)
        {
            this.passwordHasher = passwordHasher;
            this.userRepository = userRepository;
            this.tokenHandler = tokenHandler;
        }

        public async Task<ServiceResponse<AccessToken>> CreateAccessTokenAsync(string emailAddress, string password)
        {
            User existingUser = userRepository.FindByEmailAddress(emailAddress);
            if (existingUser == null)
            {
                return new ServiceResponse<AccessToken>("Error: cannot find user by email address");
            }

            PasswordVerificationResult passwordVerification = passwordHasher.VerifyHashedPassword(existingUser, existingUser.Password, password);
            if (passwordVerification == PasswordVerificationResult.Success)
            {
                AccessToken token = await tokenHandler.GenerateAccessToken(existingUser);
                return new ServiceResponse<AccessToken>(token);
            }

            return new ServiceResponse<AccessToken>($"Error: invalid credentials");
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
            
            var accessToken = await tokenHandler.GenerateAccessToken(user);
            return new ServiceResponse<AccessToken>(accessToken);
        }

        public async Task<ServiceResponse<RefreshToken>> RevokeRefreshTokenAsync(string refreshToken)
        {
            await tokenHandler.RevokeRefreshToken(refreshToken);
            return new ServiceResponse<RefreshToken>(refreshToken);
        }
    }
}
