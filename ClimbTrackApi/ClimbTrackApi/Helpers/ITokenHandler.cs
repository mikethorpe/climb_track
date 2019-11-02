using ClimbTrackApi.Domain.Models.Auth;
using System.Threading.Tasks;

namespace ClimbTrackApi.Helpers
{
    public interface ITokenHandler
    {
        AccessToken GenerateAccessToken(User user);
        Task<RefreshToken> GetRefreshTokenAsync(string token);
        Task RevokeRefreshToken(string refreshToken);
    }
}
