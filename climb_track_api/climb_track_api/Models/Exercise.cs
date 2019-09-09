using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace climb_track_api.Models
{
    public class Exercise
    {
        //public Exercise(String Name, int reps, int sets)
        //{
        //    this.Name = name;
        //    this.Reps = reps;
        //    this.Sets = sets;
        //}

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Required]
        public int ID { get; set; }

        [Required]
        public string Name { get; set; }
        public int Reps { get; set; }
        public int Sets { get; set; }
        public string Notes { get; set; }
    }
}