
using ClimbTrackApi.Persistence.Contexts;
using ClimbTrackApi.Persistence.Models;
using ClimbTrackApi.Persistence.Repositories;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using System;

namespace Persistence.Tests.Repositories
{
    internal class UserRepositoryTests
    {
        [TestFixture]
        internal class FindByEmailAddress_ContextContainsUserWithMatchingEmailAddress : UserRepositoryTests, IDisposable
        {
            private UserRepository userRepository;
            private DbContextOptions<ClimbTrackContext> contextOptions;
            private SqliteConnection sqliteConnection;
            private ClimbTrackContext context;

            [SetUp]
            public void Setup()
            {
                var sqliteConnection = new SqliteConnection("Data Source=:memory:");
                sqliteConnection.Open();
                contextOptions = new DbContextOptionsBuilder<ClimbTrackContext>()
                        .UseSqlite(sqliteConnection)
                        .Options;
                context = new ClimbTrackContext(contextOptions, null);
                context.Database.EnsureCreated();
                context.Users.Add(new User { EmailAddress = "user@domain.com", Password = "password", Role = RoleEnum.USER });
                context.SaveChanges();
                userRepository = new UserRepository(context);
            }

            public void Dispose()
            {
                sqliteConnection.Dispose();
            }

            [Test]
            public void Returns_user_with_matching_email_address()
            {
                User user = userRepository.FindByEmailAddress("user@domain.com");
                Assert.That(user.EmailAddress, Is.EqualTo("user@domain.com"));
            }
        }
    }
}
