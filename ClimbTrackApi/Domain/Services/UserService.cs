using ClimbTrackApi.Domain.Communication;
using ClimbTrackApi.Persistence.Models;
using ClimbTrackApi.Persistence.Repositories;
using Microsoft.AspNetCore.Identity;
using System;
using System.Threading.Tasks;

namespace ClimbTrackApi.Domain.Services
{
    public class UserService
    {
        private readonly UserRepository userRepository;
        private readonly UnitOfWork UnitOfWork;
        private readonly IPasswordHasher<User> passwordHasher;

        public UserService(UserRepository userRepository, UnitOfWork UnitOfWork, IPasswordHasher<User> passwordHasher)
        {
            this.userRepository = userRepository;
            this.UnitOfWork = UnitOfWork;
            this.passwordHasher = passwordHasher;
        }

        public async Task<ServiceResponse<User>> CreateUserAsync(RoleEnum role, User user)
        {
            var existingUser = userRepository.FindByEmailAddress(user.EmailAddress);

            if (existingUser != null)
            {
                return new ServiceResponse<User>($"A user with the address {user.EmailAddress} is already registered");
            }

            user.Password = passwordHasher.HashPassword(user, user.Password);
            user.Role = role;

            try
            {
                await userRepository.AddAsync(user);
                await UnitOfWork.CompleteAsync();
                return new ServiceResponse<User>(user);
            }
            catch (Exception)
            {
                return new ServiceResponse<User>($"Error occurred whilst creating user");
            }
        }
    }
}
