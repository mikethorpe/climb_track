using ClimbTrackApi.Domain.Models.Auth;
using ClimbTrackApi.Domain.Services.Communication;
using System.Threading.Tasks;

namespace ClimbTrackApi.Domain.Services
{
    public interface IAuthenticationService
    {
        Task<ServiceResponse<AccessToken>> CreateAccessTokenAsync(string emailAddress, string password);
        Task<ServiceResponse<AccessToken>> RefreshTokenAsync(string refreshToken, string emailAddress);
        Task<ServiceResponse<object>> RevokeRefreshTokenAsync(string refreshToken);
    }
}
