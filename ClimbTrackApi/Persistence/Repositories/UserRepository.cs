using System.Linq;
using System.Threading.Tasks;
using ClimbTrackApi.Domain.Interfaces;
using ClimbTrackApi.Domain.Models;
using ClimbTrackApi.Persistence.Contexts;

namespace ClimbTrackApi.Persistence.Repositories
{
    public class UserRepository : IUserRepository
    {
        ClimbTrackContext _context;

        public UserRepository(ClimbTrackContext context)
        {
            _context = context;
        }

        public async Task<User> FindByIdAsync(int id)
        {
            return await _context.Users.FindAsync(id);
        }

        public async Task AddAsync(User user)
        {
            await _context.Users.AddAsync(user);
        }

        public User FindByEmailAddress(string emailAddress)
        {
            return _context.Users
                .Where(u => u.EmailAddress == emailAddress)
                .SingleOrDefault();
        }
    }
}
