using ClimbTrackApi.Domain.Models;
using ClimbTrackApi.Persistence.Contexts;
using ClimbTrackApi.Persistence.Repositories;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ClimbTrackApi.Domain.Repositories
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

        public async Task<RefreshToken> FindByUserIdAsync(int userID)
        {
            return await _context.RefreshTokens
                .Where(t => t.UserId == userID)
                .Where(t => t.Deleted == null)
                .SingleOrDefaultAsync();
        }
        
    }
}
