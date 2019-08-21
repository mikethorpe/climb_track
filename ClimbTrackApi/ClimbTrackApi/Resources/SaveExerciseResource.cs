using System.ComponentModel.DataAnnotations;

namespace ClimbTrackApi.Resources
{
    public class SaveExerciseResource
    {
        [Required]
        [MaxLength(30)]
        public string Name { get; set; }
        [Required]
        public int Reps { get; set; }
        [Required]
        public int Sets { get; set; }
        public string Notes { get; set; }   
    }
}