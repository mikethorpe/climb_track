using ClimbTrackApi.Auth.Interfaces;
using ClimbTrackApi.Auth.Models;
using ClimbTrackApi.Persistence.Contexts;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace ClimbTrackApi.Persistence.Repositories
{
    public class RefreshTokenRepository : BaseRepository, IRefreshTokenRepository
    {
        public RefreshTokenRepository(ClimbTrackContext context) : base(context)
        {

        }

        public async Task AddAsync(RefreshToken exercise)
        {
            await _context.AddAsync(exercise);
        }

        public async Task<RefreshToken> FindByIdAsync(int id)
        {
            return await _context.RefreshTokens.FindAsync(id);
        }

        public async Task<RefreshToken> FindByToken(string token)
        {
            return await _context.RefreshTokens
                .Where(rt => rt.Token == token)
                .SingleOrDefaultAsync();
        }

        public async Task<RefreshToken> FindByUserIdAsync(int userID)
        {
            return await _context.RefreshTokens
                .Where(t => t.UserId == userID)
                .Where(t => t.Deleted == null)
                .SingleOrDefaultAsync();
        }

        public void Remove(RefreshToken refreshToken)
        {
            _context.RefreshTokens.Remove(refreshToken);
        }
    }
}
 