using Microsoft.EntityFrameworkCore;

namespace climb_track_api.Models
{
    public class ClimbTrackContext : DbContext
    {
        public ClimbTrackContext(DbContextOptions<ClimbTrackContext> options)
            : base(options)
        {
        }

        public DbSet<Exercise> Exercises { get; set; }
    }
}