using ClimbTrackApi.Domain.Models.Auth;
using ClimbTrackApi.Domain.Services.Communication;
using System.Threading.Tasks;

namespace ClimbTrackApi.Domain.Services
{
    public interface IUserService
    {
        Task<ServiceResponse<User>> CreateUserAsync(RoleEnum role, User user);
    }
}
