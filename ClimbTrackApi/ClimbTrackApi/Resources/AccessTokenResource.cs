using ClimbTrackApi.Domain.Models;

namespace ClimbTrackApi.Resources
{
    public class AccessTokenResource
    {
        public RefreshToken RefreshToken { get; set; }
        public string Token { get; set; }
    }
}
