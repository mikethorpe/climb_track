
using ClimbTrackApi.Persistence.Contexts;
using ClimbTrackApi.Persistence.Models;
using ClimbTrackApi.Persistence.Repositories;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using System.Threading.Tasks;

namespace Persistence.Tests.Repositories
{
    internal class UserRepositoryTests
    {
        private SqliteConnection sqliteConnection;
        private ClimbTrackContext context;
        private DbContextOptions<ClimbTrackContext> contextOptions;

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
        }

        [TearDown]
        public void Dispose()
        {
            sqliteConnection.Dispose();
        }


        [TestFixture]
        internal class FindByEmailAddress_ContextContainsUserWithMatchingEmailAddress : UserRepositoryTests
        {
            private User user;

            [SetUp]
            public async Task Setup()
            {
                context.Users.Add(new User { EmailAddress = "user@domain.com", Password = "password", Role = RoleEnum.USER });
                context.SaveChanges();
                UserRepository userRepository = new UserRepository(context);
                user = await userRepository.FindByEmailAddress("user@domain.com");
            }

            [Test]
            public void Returns_user_with_matching_email_address()
            {
                Assert.That(user.EmailAddress, Is.EqualTo("user@domain.com"));
            }
        }

        [TestFixture]
        internal class FindByEmailAddress_ContextContainsUserWithoutMatchingEmailAddress : UserRepositoryTests
        {
            private User user;

            [SetUp]
            public async Task Setup()
            {
                context.Users.Add(new User { EmailAddress = "nonmatchinguser@domain.com", Password = "password", Role = RoleEnum.USER });
                context.SaveChanges();
                UserRepository userRepository = new UserRepository(context);
                user = await userRepository.FindByEmailAddress("user@domain.com");
            }

            [Test]
            public void Returns_null()
            {
                Assert.That(user, Is.Null);
            }
        }
    }
}
