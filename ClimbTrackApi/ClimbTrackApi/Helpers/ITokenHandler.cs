using ClimbTrackApi.Domain.Models;

namespace ClimbTrackApi.Helpers
{
    public interface ITokenHandler
    {
        AccessToken GenerateAccessToken(User user);
    }
}
