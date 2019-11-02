using ClimbTrackApi.Auth.Models;
using System.Threading.Tasks;

namespace ClimbTrackApi.Auth.Interfaces
{
    public interface IRefreshTokenRepository
    {
        Task<RefreshToken> FindByToken(string token);
        Task AddAsync(RefreshToken refreshToken);
        Task<RefreshToken> FindByIdAsync(int id);
        Task<RefreshToken> FindByUserIdAsync(int id);
        void Remove(RefreshToken refreshToken);
    }
}