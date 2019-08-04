using System;
using System.Collections.Generic;

namespace ClimbTrackApi.Domain.Models
{
    public class Workout
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public DateTime Date { get; set; }
        public ICollection<WorkoutExercise> WorkoutExercises { get; set; }        
    }
}