using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Web;

namespace ClimbTrackApi.Models
{
    public class Exercise
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int Reps { get; set; }
        public int Sets { get; set; }
        public string Notes { get; set; }
    }
}