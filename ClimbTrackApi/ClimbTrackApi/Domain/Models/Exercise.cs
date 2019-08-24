using System.Collections.Generic;

namespace ClimbTrackApi.Domain.Models
{
    public class Exercise
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Reps { get; set; }
        public int Sets { get; set; }
        public string Notes { get; set; }
        public virtual ICollection<WorkoutExercise> WorkoutExercises { get; set; }        

    }
}