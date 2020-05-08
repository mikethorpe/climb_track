﻿using ClimbTrackApi.Common.Communication;
using ClimbTrackApi.Domain.Interfaces;
using ClimbTrackApi.Domain.Models;
using Microsoft.AspNetCore.Identity;
using System;
using System.Threading.Tasks;

namespace ClimbTrackApi.Auth.Services
{
    public class UserService
    {
        private readonly IUserRepository userRepository;
        private readonly IUnitOfWork unitOfWork;
        private readonly IPasswordHasher<User> passwordHasher;

        public UserService(IUserRepository userRepository, IUnitOfWork unitOfWork, IPasswordHasher<User> passwordHasher)
        {
            this.userRepository = userRepository;
            this.unitOfWork = unitOfWork;
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
                await unitOfWork.CompleteAsync();
                // In the controller we map this to a user resource
                // We are returning the hashed password into the controller method here which is potentially dangerous
                // Should it ever be returned from this method???
                return new ServiceResponse<User>(user);
            }
            catch (Exception ex)
            {
                return new ServiceResponse<User>($"Error occurred whilst creating user: {ex.Message}");
            }
        }
    }
}
