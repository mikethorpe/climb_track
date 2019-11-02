using System.ComponentModel.DataAnnotations;

namespace ClimbTrackApi.Resources
{
    public class UserCredentialResource
    {
        [Required]
        [MaxLength(50)]
        public string EmailAddress { get; set; }
        [Required]
        [MaxLength(30)]
        public string Password { get; set; }
    }
}
