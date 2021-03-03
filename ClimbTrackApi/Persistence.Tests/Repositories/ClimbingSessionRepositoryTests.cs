using ClimbTrackApi.Persistence.Contexts;
using ClimbTrackApi.Persistence.Models;
using ClimbTrackApi.Persistence.Repositories;
using Microsoft.Data.Sqlite;
using Microsoft.EntityFrameworkCore;
using NUnit.Framework;
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
            context.Styles.Add(new StyleBuilder().Build());
            context.SaveChanges();
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
                var climbingSessionRepository = new ClimbingSessionRepository(context);
                await climbingSessionRepository.AddAsync(new ClimbingSessionBuilder().Build());
                context.SaveChanges();
            }

            [Test]
            public void Climbing_session_is_added_to_repository()
            {
                Assert.That(context.ClimbingSessions.Count, Is.EqualTo(1));
            }
        }

        [TestFixture]
        internal class ListAsync_ClimbingSessionsExistForMultipleUsers : ClimbingSessionRepositoryTests
        {
            private IEnumerable<ClimbingSession> climbingSessions;

            [SetUp]
            public async Task Setup()
            {
                context.ClimbingSessions.AddRange(
                    new List<ClimbingSession>
                    {
                        new ClimbingSessionBuilder().WithUserId(1).Build(),
                        new ClimbingSessionBuilder().WithUserId(1).Build(),
                        new ClimbingSessionBuilder().WithUserId(2).Build()
                    }
                );
                context.SaveChanges();
                var climbingSessionRepository = new ClimbingSessionRepository(context);
                climbingSessions = await climbingSessionRepository.ListAsync(1);
            }

            [Test]
            public void Returns_only_climbing_sessions_associated_with_the_passed_user()
            {
                Assert.That(climbingSessions.All(cs => cs.UserId == 1), Is.True);
            }

            [Test]
            public void Returns_all_climbing_sessions_of_the_current_user()
            {
                Assert.That(climbingSessions.Count, Is.EqualTo(2));
            }
        }

        [TestFixture]
        internal class FindById_ClimbingSessionExistsInContext :ClimbingSessionRepositoryTests
        {
            private ClimbingSession climbingSession;

            [SetUp]
            public async Task Setup()
            {
                context.ClimbingSessions.AddRange(
                    new List<ClimbingSession>
                    {
                        new ClimbingSessionBuilder().WithUserId(1).Build(),
                        new ClimbingSessionBuilder().WithUserId(2).Build()
                    }
                );
                context.SaveChanges();
                var climbingSessionRepository = new ClimbingSessionRepository(context);
                climbingSession = await climbingSessionRepository.FindByIdAsync(2);
            }

            [Test]
            public void Returns_climbing_session()
            {
                Assert.That(climbingSession.Id, Is.EqualTo(2));
            }
        }

        [TestFixture]
        internal class FindByIdAsync_ClimbingSessionDoesNotExistInContext : ClimbingSessionRepositoryTests
        {
            private ClimbingSession climbingSession;

            [SetUp]
            public async Task Setup()
            {
                var climbingSessionRepository = new ClimbingSessionRepository(context);
                climbingSession = await climbingSessionRepository.FindByIdAsync(2);
            }

            [Test]
            public void Returns_null()
            {
                Assert.IsNull(climbingSession);
            }
        }

        [TestFixture]
        internal class RemoveAsync_ClimbingSessionToRemoveExists : ClimbingSessionRepositoryTests
        {
            private bool success;

            [SetUp]
            public async Task Setup()
            {
                context.ClimbingSessions.AddRange(
                    new List<ClimbingSession>
                    {
                        new ClimbingSessionBuilder().WithUserId(1).Build(),
                        new ClimbingSessionBuilder().WithUserId(2).Build()
                    }
                );
                context.SaveChanges();
                var climbingSessionRepository = new ClimbingSessionRepository(context);
                success = await climbingSessionRepository.RemoveAsync(1);
                context.SaveChanges();
            }

            
            [Test]
            public void Returns_true()
            {
                Assert.True(success);
            }

            [Test]
            public void Removes_climbing_session()
            {
                Assert.That(context.ClimbingSessions.Where(cs => cs.Id == 1).Count, Is.EqualTo(0));
            }
        }
    }
}
