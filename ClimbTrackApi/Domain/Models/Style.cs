using System.Collections.Generic;

namespace ClimbTrackApi.Domain.Models
{
    public class Style
    {
        public int Id { get; set; }
        public string Description { get; set; }
        public IEnumerable<Climb> Climbs { get; set; }
    }
}
