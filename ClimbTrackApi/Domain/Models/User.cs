namespace ClimbTrackApi.Domain.Models
{
    public class User
    {
        public int Id { get; set; }
        public string EmailAddress { get; set; }
        public string Password { get; set; }
        public RoleEnum Role { get; set; }
    }
}
