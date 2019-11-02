using ClimbTrackApi.Auth.Models;
using ClimbTrackApi.Common.Communication;
using System.Threading.Tasks;

namespace ClimbTrackApi.Auth.Interfaces
{
    public interface IAuthenticationService
    {
        Task<ServiceResponse<AccessToken>> CreateAccessTokenAsync(string emailAddress, string password);
        Task<ServiceResponse<AccessToken>> RefreshTokenAsync(string refreshToken, string emailAddress);
        Task<ServiceResponse<object>> RevokeRefreshTokenAsync(string refreshToken);
    }
}
