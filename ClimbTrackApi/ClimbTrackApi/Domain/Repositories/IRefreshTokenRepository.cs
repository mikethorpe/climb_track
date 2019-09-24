using ClimbTrackApi.Domain.Models;
using System.Threading.Tasks;

namespace ClimbTrackApi.Domain.Repositories
{
    public interface IRefreshTokenRepository
    {
        Task AddAsync(RefreshToken refreshToken);
        Task<RefreshToken> FindByIdAsync(int id);
        Task<RefreshToken> FindByUserIdAsync(int id);
        void Remove(RefreshToken refreshToken);
    }
}