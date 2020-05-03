using ClimbTrackApi.Domain.Models;
using ClimbTrackApi.Common.Communication;
using System.Threading.Tasks;

namespace ClimbTrackApi.Auth.Interfaces
{
    public interface IUserService
    {
        Task<ServiceResponse<User>> CreateUserAsync(RoleEnum role, User user);
    }
}
