using ClimbTrackApi.Auth.Interfaces;
using ClimbTrackApi.Auth.Models;
using ClimbTrackApi.Common.Communication;
using ClimbTrackApi.Domain.Interfaces;
using System;
using System.Threading.Tasks;

namespace ClimbTrackApi.Auth.Services
{
    public class UserService : IUserService
    {
        private IUserRepository _userRepository { get; set; }
        private IUnitOfWork _unitOfWork { get; set; }
        private IPasswordHasher<User> _passwordHasher { get; set; }

        public UserService(IUserRepository userRepository, IUnitOfWork unitOfWork, IPasswordHasher<User> passwordHasher)
        {
            _userRepository = userRepository;
            _unitOfWork = unitOfWork;
            _passwordHasher = passwordHasher;
        }

        public async Task<ServiceResponse<User>> CreateUserAsync(RoleEnum role, User user)
        {
            var existingUser = _userRepository.FindByEmailAddress(user.EmailAddress);

            if (existingUser != null) return new ServiceResponse<User>($"A user with the address {user.EmailAddress} is already registered");

            user.Password = _passwordHasher.HashPassword(user, user.Password);
            user.Role = role;

            try
            {
                await _userRepository.AddAsync(user);
                await _unitOfWork.CompleteAsync();
                return new ServiceResponse<User>(user);
            }
            catch (Exception ex)
            {
                return new ServiceResponse<User>($"Error occurred whilst creating user: {ex.Message}");
            }
        }
    }
}
