namespace ClimbTrackApi.Persistence.Models
{
    public class Climb
    {
        public int Id { get; set; }
        public string Grade { get; set; }
        public int StyleId { get; set; }
        public Style Style { get; set; }
        public ClimbingSession ClimbingSession { get; set; }
    }
}
