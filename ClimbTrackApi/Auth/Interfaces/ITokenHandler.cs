using ClimbTrackApi.Auth.Models;
using ClimbTrackApi.Domain.Models;
using System.Threading.Tasks;

namespace ClimbTrackApi.Auth.Interfaces
{
    public interface ITokenHandler
    {
        AccessToken GenerateAccessToken(User user);
        Task<RefreshToken> GetRefreshTokenAsync(string token);
        Task RevokeRefreshToken(string refreshToken);
    }
}
