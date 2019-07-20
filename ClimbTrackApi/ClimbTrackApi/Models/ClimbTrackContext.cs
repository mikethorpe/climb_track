using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
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

        private IConfiguration _configuration;
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
            => optionsBuilder.UseNpgsql(_configuration.GetConnectionString("DefaultConnection"));


        public ClimbTrackContext(DbContextOptions<ClimbTrackContext> options, IConfiguration configuration) : base(options)
        {
            _configuration = configuration;
        }
    }
}
