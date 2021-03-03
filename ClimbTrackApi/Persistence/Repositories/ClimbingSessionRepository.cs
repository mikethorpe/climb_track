using ClimbTrackApi.Persistence.Models;
using ClimbTrackApi.Persistence.Contexts;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ClimbTrackApi.Persistence.Repositories
{
    public class ClimbingSessionRepository
    {
        private readonly ClimbTrackContext context;

        public ClimbingSessionRepository(ClimbTrackContext context)
        {
            this.context = context;
        }

        public async Task<ClimbingSession> AddAsync(ClimbingSession climbingSession)
        {
            var climbingSessionToSave = new ClimbingSession
            {
                DateTime = climbingSession.DateTime,
                MaxGrade = climbingSession.MaxGrade,
                UserId = climbingSession.UserId,
                Climbs = climbingSession.Climbs
                .Select(c => new Climb
                {
                    Grade = c.Grade,
                    StyleId = c.StyleId
                }).ToList()
            };
            await context.ClimbingSessions.AddAsync(climbingSessionToSave);
            climbingSession.Id = climbingSessionToSave.Id;
            return climbingSession;
        }

        public async Task<ICollection<ClimbingSession>> ListAsync(int userId)
        {
            return await context.ClimbingSessions
                .Where(cs => cs.UserId == userId)
                .Select(cs => new ClimbingSession
                {
                    Id = cs.Id,
                    DateTime = cs.DateTime,
                    MaxGrade = cs.MaxGrade,
                    UserId = cs.UserId,
                    Climbs = cs.Climbs
                    .Select(c => new Climb
                    {
                        Id = c.Id,
                        Grade = c.Grade,
                        Style = new Style
                        {
                            Id = c.Style.Id,
                            Description = c.Style.Description
                        }
                    }).ToList()
                }).ToListAsync();
        }

        public async Task<ClimbingSession> FindByIdAsync(int climbingSessionId)
        {
            ClimbingSession climbingSession = await context.ClimbingSessions.FindAsync(climbingSessionId);
            if (climbingSession == null)
            {
                return null;
            }
            return new ClimbingSession
            {
                Id = climbingSession.Id,
                DateTime = climbingSession.DateTime,
                MaxGrade = climbingSession.MaxGrade,
                UserId = climbingSession.UserId,
                Climbs = climbingSession.Climbs
                .Select(c => new Climb
                {
                    Id = c.Id,
                    Grade = c.Grade,
                    Style = new Style
                    {
                        Id = c.Style.Id,
                        Description = c.Style.Description
                    }
                }).ToList()
            };
        }

        public async Task<bool> RemoveAsync(int climbingSessionId)
        {
            ClimbingSession existingClimbingSession = await context.ClimbingSessions.FindAsync(climbingSessionId);
            if (existingClimbingSession == null)
            {
                return false;
            }
            context.ClimbingSessions.Remove(existingClimbingSession);
            return true;
        }
    }
}
