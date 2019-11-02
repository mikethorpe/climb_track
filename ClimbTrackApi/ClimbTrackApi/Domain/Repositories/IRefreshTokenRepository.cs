using ClimbTrackApi.Domain.Models.Auth;
using System.Threading.Tasks;

namespace ClimbTrackApi.Domain.Repositories
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