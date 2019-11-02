using ClimbTrackApi.Auth.Models;
using System.Threading.Tasks;

namespace ClimbTrackApi.Auth.Interfaces
{
    public interface IUserRepository
    {
        Task<User> FindByIdAsync(int id);
        Task AddAsync(User user);
        User FindByEmailAddress(string emailAddress);
    }
}
