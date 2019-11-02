using System;

namespace ClimbTrackApi.Domain.Models
{
    public class AccessToken
    {
        public RefreshToken RefreshToken { get; private set; }
        public long Expiration { get; private set; }
        public String Token { get; private set; }

        public AccessToken(String token, long expiration, RefreshToken refreshToken)
        {
            RefreshToken = refreshToken;
            Expiration = expiration;
            Token = token;
        }
    }
}
