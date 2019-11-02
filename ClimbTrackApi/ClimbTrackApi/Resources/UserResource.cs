using ClimbTrackApi.Domain.Models;

namespace ClimbTrackApi.Resources
{
    public class UserResource
    {
        public int Id { get; set; }
        public string EmailAddress { get; set; }
        public string Role { get; set; }
    }
}
