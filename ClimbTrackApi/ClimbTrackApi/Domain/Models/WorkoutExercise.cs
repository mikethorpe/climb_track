namespace ClimbTrackApi.Domain.Models
{
    public class WorkoutExercise
    {
        public int ExerciseID { get; set; }
        public Exercise Exercise { get; set; }
        public int WorkoutId { get; set; }
        public Workout Workout { get; set; }
    }
}