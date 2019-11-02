using ClimbTrackApi.Domain.Models.Auth;

namespace ClimbTrackApi.Resources
{
    public class AccessTokenResource
    {
        public RefreshToken RefreshToken { get; set; }
        public string Token { get; set; }
    }
}
