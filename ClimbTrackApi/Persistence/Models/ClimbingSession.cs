using System;
using System.Collections.Generic;

namespace ClimbTrackApi.Persistence.Models
{
    public class ClimbingSession
    {
        public int Id { get; set; }
        public DateTime DateTime { get; set; }
        public string MaxGrade { get; set; }
        public IEnumerable<Climb> Climbs { get; set; }
        public int UserId { get; set; }
        // Should have a foreign relation to User entity - lazy loaded
    }
}
