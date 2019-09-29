using ClimbTrackApi.Domain.Models;
using System.Threading.Tasks;

namespace ClimbTrackApi.Helpers
{
    public interface ITokenHandler
    {
        AccessToken GenerateAccessToken(User user);
        Task<RefreshToken> GetRefreshTokenAsync(string token);
    }
}
