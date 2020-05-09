namespace ClimbTrackApi.Persistence.Models
{
    public class AccessToken
    {
        public RefreshToken RefreshToken { get; private set; }
        public long Expiration { get; private set; }
        public string Token { get; private set; }

        public AccessToken(string token, long expiration, RefreshToken refreshToken)
        {
            RefreshToken = refreshToken;
            Expiration = expiration;
            Token = token;
        }
    }
}
