using ClimbTrackApi.Persistence.Contexts;
using ClimbTrackApi.Persistence.Models;
using ClimbTrackApi.Persistence.Repositories;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Test.Common.Builders;

namespace Persistence.Tests.Repositories
{
    internal class ClimbingSessionRepositoryTests
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
        internal class AddAsync_PassedClimbingSession : ClimbingSessionRepositoryTests
        {
            [SetUp]
            public async Task Setup()
            {
                context.Styles.Add(new StyleBuilder().Build());
                context.SaveChanges();
                IEnumerable<Style> styles = context.Styles.ToList();
                var climbingSession = new ClimbingSessionBuilder().Build();
                var climbingSessionRepository = new ClimbingSessionRepository(context);
                await climbingSessionRepository.AddAsync(climbingSession);
            }

            [Test]
            public void Climbing_session_is_added_to_repository()
            {
                Console.WriteLine();
                Assert.That(context.ClimbingSessions.Where(cs => cs.DateTime.ToString() == new DateTime(2021, 02, 17, 10, 10, 10).ToString()).Count, Is.EqualTo(1));
            }
        }

        //[TestFixture]
        //internal class FindByEmailAddress_ContextContainsUserWithoutMatchingEmailAddress : ClimbingSessionRepositoryTests
        //{
        //    private User user;

        //    [SetUp]
        //    public async Task Setup()
        //    {
        //        context.Users.Add(new User { EmailAddress = "nonmatchinguser@domain.com", Password = "password", Role = RoleEnum.USER });
        //        context.SaveChanges();
        //        UserRepository userRepository = new UserRepository(context);
        //        user = await userRepository.FindByEmailAddress("user@domain.com");
        //    }

        //    [Test]
        //    public void Returns_null()
        //    {
        //        Assert.That(user, Is.Null);
        //    }
        //}
    }
}
