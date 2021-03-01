using ClimbTrackApi.Domain.Communication;
using ClimbTrackApi.Domain.Services;
using ClimbTrackApi.Persistence.Contexts;
using ClimbTrackApi.Persistence.Models;
using ClimbTrackApi.Persistence.Repositories;
using Microsoft.AspNetCore.Identity;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using Moq;
using NUnit.Framework;
using System;
using System.Linq;
using System.Threading.Tasks;

namespace Domain.Tests.Services
{
    internal class UserServiceTests
    {
        private SqliteConnection sqliteConnection;
        private ClimbTrackContext context;
        private DbContextOptions<ClimbTrackContext> contextOptions;
        protected UserService userService;

        [SetUp]
        public void BaseSetup()
        {
            sqliteConnection = new SqliteConnection("Data Source=:memory:");
            sqliteConnection.Open();
            contextOptions = new DbContextOptionsBuilder<ClimbTrackContext>()
                    .UseSqlite(sqliteConnection)
                    .Options;
            context = new ClimbTrackContext(contextOptions, null);
            context.Database.EnsureCreated();
            context.Users.Add(new User { EmailAddress = "user@domain.com", Password = "password", Role = RoleEnum.USER });
            context.SaveChanges();
            var userRepository = new UserRepository(context);
            var unitOfWork = new UnitOfWork(context);
            var passwordHasher = new Mock<IPasswordHasher<User>>();
            passwordHasher.Setup(pwh => pwh.HashPassword(It.IsAny<User>(), It.IsAny<string>())).Returns("hashedpassword");
            userService = new UserService(userRepository, unitOfWork, passwordHasher.Object);
        }

        [TearDown]
        public void Dispose()
        {
            sqliteConnection.Dispose();
        }

        [TestFixture]
        internal class CreateUserAsync_UserWithEmailAddressDoesNotExist : UserServiceTests
        {
            private ServiceResponse<User> response;

            [SetUp]
            public async Task Setup()
            {
                var newUser = new User { EmailAddress = "newuser@domain.com", Password = "password" };
                response =  await userService.CreateUserAsync(RoleEnum.USER, newUser);
            }

            [Test]
            public void User_is_created()
            {
                Assert.That(context.Users.Where(u => u.EmailAddress == "newuser@domain.com").Count, Is.EqualTo(1));
            }

            [Test]
            public void Response_is_success()
            {
                Assert.That(response.Success, Is.True);
            }
        }

        [TestFixture]
        internal class CreateUserAsync_UserWithEmailAddressExists : UserServiceTests
        {
            private ServiceResponse<User> response;

            [SetUp]
            public async Task Setup()
            {
                var newUser = new User { EmailAddress = "user@domain.com", Password = "password" };
                response = await userService.CreateUserAsync(RoleEnum.USER, newUser);
            }

            [Test]
            public void User_is_not_created()
            {
                Assert.That(context.Users.Where(u => u.EmailAddress == "user@domain.com").Count, Is.EqualTo(1));
            }

            [Test]
            public void Response_is_failure()
            {
                Assert.That(response.Success, Is.False);
            }

            [Test]
            public void Response_message_indicates_user_already_exists()
            {
                Assert.That(response.Message, Is.EqualTo("A user with the address user@domain.com is already registered"));
            }
        }
    }
}
