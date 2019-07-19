using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ClimbTrackApi.Models
{
    public class ClimbTrackContext: DbContext
    {
        public DbSet<Activity> Activities { get; set; }
        public DbSet<Exercise> Exercises { get; set; }
        public DbSet<Workout> Workouts { get; set; }

        public ClimbTrackContext(DbContextOptions<ClimbTrackContext> options): base(options)
        {
        }
    }
}
