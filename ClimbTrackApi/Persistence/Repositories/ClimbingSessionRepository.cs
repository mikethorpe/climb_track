using ClimbTrackApi.Domain.Interfaces;
using ClimbTrackApi.Domain.Models;
using ClimbTrackApi.Persistence.Contexts;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ClimbTrackApi.Persistence.Repositories
{
    public class ClimbingSessionRepository : BaseRepository, IClimbingSessionRepository
    {
        public ClimbingSessionRepository(ClimbTrackContext context) : base(context)
        {

        }

        public async Task AddAsync(ClimbingSession climbingSession)
        {
            await context.ClimbingSessions.AddAsync(climbingSession);
        }

        public async Task<ICollection<ClimbingSession>> ListAsync()
        {
            return await context.ClimbingSessions
                .Select(cs => new ClimbingSession
                {
                    Id = cs.Id,
                    DateTime = cs.DateTime,
                    MaxGrade = cs.MaxGrade,
                    Climbs = cs.Climbs.Select(c => new Climb
                    {
                        Id = c.Id,
                        Grade = c.Grade,
                        Style = new Style
                        {
                            Id = c.Style.Id,
                            Description = c.Style.Description
                        }
                    })
                }).ToListAsync();
        }
    }
}
