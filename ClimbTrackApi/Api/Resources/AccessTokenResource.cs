using ClimbTrackApi.Auth.Models;

namespace ClimbTrackApi.Api.Resources
{
    public class AccessTokenResource
    {
        public RefreshToken RefreshToken { get; set; }
        public string Token { get; set; }
    }
}
