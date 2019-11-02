using ClimbTrackApi.Domain.Models.Auth;
using System.Threading.Tasks;

namespace ClimbTrackApi.Domain.Repositories
{
    public interface IUserRepository
    {
        Task<User> FindByIdAsync(int id);
        Task AddAsync(User user);
        User FindByEmailAddress(string emailAddress);
    }
}
