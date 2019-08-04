using System.ComponentModel.DataAnnotations;

namespace ClimbTrackApi.Resources
{
    public class SaveExerciseResource
    {
        // data annotations are used to validate requests  / responses
        [Required]
        [MaxLength(30)]
        public string Name { get; set; }
        public int Reps { get; set; }
        public int Sets { get; set; }
        public string Notes { get; set; }   
    }
}