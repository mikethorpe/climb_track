using ClimbTrackApi.Domain.Models;
using System.Collections.Generic;

namespace ClimbTrackApi.Api.Resources
{
    public class ClimbingSessionDto
    {
        public int Id { get; set; }
        public string DateTime { get; set; }
        public IEnumerable<Climb> Climbs { get; set; }
        public string MaxGrade { get; set; }

        public ClimbingSessionDto()
        {
            Climbs = new List<Climb>();
        }
    }
}
