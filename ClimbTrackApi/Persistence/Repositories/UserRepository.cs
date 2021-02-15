using System.Linq;
using System.Threading.Tasks;
using ClimbTrackApi.Persistence.Models;
using ClimbTrackApi.Persistence.Contexts;
using System.Runtime.InteropServices.WindowsRuntime;
using Microsoft.EntityFrameworkCore;

namespace ClimbTrackApi.Persistence.Repositories
{
    public class UserRepository
    {
        private readonly ClimbTrackContext context;

        public UserRepository(ClimbTrackContext context)
        {
            this.context = context;
        }

        public async Task<User> FindByIdAsync(int id)
        {
            User userEntity = await context.Users.FindAsync(id);
            return CreateProjection(userEntity);
        }

        public async Task AddAsync(User user)
        {
            await context.Users.AddAsync(user);
        }

        public async Task<User> FindByEmailAddress(string emailAddress)
        {
            User userEntity = await context.Users
                .Where(u => u.EmailAddress == emailAddress)
                .SingleOrDefaultAsync();
            if (userEntity == null)
            {
                return null;
            }
            return CreateProjection(userEntity);
        }

        private User CreateProjection(User userEntity)
        {
            return new User
            {
                Id = userEntity.Id,
                EmailAddress = userEntity.EmailAddress,
                Password = userEntity.Password,
                Role = userEntity.Role
            };
        }
    }
}
