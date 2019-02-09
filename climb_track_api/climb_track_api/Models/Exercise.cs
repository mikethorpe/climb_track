using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace climb_track_api.Models
{
    public class Exercise
    {
        public Exercise(String name, int reps, int sets)
        {
            this.name = name;
            this.reps = reps;
            this.sets = sets;
        }

        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [Required]
        public int ID { get; set; }

        [Required]
        public string name { get; set; }
        public int reps { get; set; }
        public int sets { get; set; }
        public string notes { get; set; }
    }
}