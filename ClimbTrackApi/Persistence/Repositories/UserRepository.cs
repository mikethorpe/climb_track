using System.Linq;
using System.Threading.Tasks;
using ClimbTrackApi.Domain.Interfaces;
using ClimbTrackApi.Domain.Models;
using ClimbTrackApi.Persistence.Contexts;

namespace ClimbTrackApi.Persistence.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly ClimbTrackContext context;

        public UserRepository(ClimbTrackContext context)
        {
            this.context = context;
        }

        public async Task<User> FindByIdAsync(int id)
        {
            return await context.Users.FindAsync(id);
        }

        public async Task AddAsync(User user)
        {
            await context.Users.AddAsync(user);
        }

        public User FindByEmailAddress(string emailAddress)
        {
            return context.Users
                .Where(u => u.EmailAddress == emailAddress)
                .SingleOrDefault();
        }
    }
}
