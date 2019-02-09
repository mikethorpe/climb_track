using climb_track_api.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace climb_track_api.Database
{
    public class ClimbTrackContext : DbContext
    {
        public virtual DbSet<Exercise> Exercises { get; set; }
        public virtual DbSet<Workout> Workouts { get; set; }
        public virtual DbSet<Activity> Activities { get; set; }
    }
}