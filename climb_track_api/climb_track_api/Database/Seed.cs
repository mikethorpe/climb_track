using climb_track_api.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace climb_track_api.Database
{
    public static class Seed
    {
        public static void BuildDb()
        {
            ClimbTrackContext climbTrackContext = new ClimbTrackContext();
            Exercise exercise1 = new Exercise("Hard exercise", 1, 1);
            climbTrackContext.Exercises.Add(exercise1);
            climbTrackContext.SaveChanges();
        }
    }
}