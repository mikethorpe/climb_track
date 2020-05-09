
using ClimbTrackApi.Persistence.Models;
using ClimbTrackApi.Persistence.Contexts;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace ClimbTrackApi.Persistence.Repositories
{
    public class RefreshTokenRepository
    {
        private readonly ClimbTrackContext context;

        public RefreshTokenRepository(ClimbTrackContext context)
        {
            this.context = context;
        }

        public async Task AddAsync(RefreshToken refreshToken)
        {
            await context.AddAsync(refreshToken);
        }

        public async Task<RefreshToken> FindByIdAsync(int id)
        {
            return await context.RefreshTokens.FindAsync(id);
        }

        public async Task<RefreshToken> FindByToken(string token)
        {
            return await context.RefreshTokens
                .Where(rt => rt.Token == token)
                .SingleOrDefaultAsync();
        }

        public async Task<RefreshToken> FindByUserIdAsync(int userID)
        {
            return await context.RefreshTokens
                .Where(t => t.UserId == userID)
                .SingleOrDefaultAsync();
        }

        public void Remove(RefreshToken refreshToken)
        {
            context.RefreshTokens.Remove(refreshToken);
        }
    }
}
 