using ClimbTrackApi.Domain.Models;
using System.Threading.Tasks;

namespace ClimbTrackApi.Domain.Interfaces
{
    public interface IUserRepository
    {
        Task<User> FindByIdAsync(int id);
        Task AddAsync(User user);
        User FindByEmailAddress(string emailAddress);
    }
}
