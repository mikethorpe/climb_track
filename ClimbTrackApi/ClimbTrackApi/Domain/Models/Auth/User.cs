using System.Collections.Generic;

namespace ClimbTrackApi.Domain.Models.Auth
{
    public class User
    {
        public int Id { get; set; }
        public string EmailAddress { get; set; }
        public string Password { get; set; }
        public RoleEnum Role { get; set; }
    }
}
