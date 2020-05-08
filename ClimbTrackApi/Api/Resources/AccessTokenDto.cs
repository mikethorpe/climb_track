using System;

namespace ClimbTrackApi.Api.Resources
{
    public class AccessTokenDto
    {
        public string AccessToken { get; set; }
        public string RefreshToken { get; set; }
        public DateTime RefreshTokenExpiration { get; set; }
    }
}
