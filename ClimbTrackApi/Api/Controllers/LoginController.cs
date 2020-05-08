using System.Threading.Tasks;
using ClimbTrackApi.Api.Resources;
using Microsoft.AspNetCore.Mvc;
using ClimbTrackApi.Domain.Services;
using ClimbTrackApi.Domain.Models;
using ClimbTrackApi.Domain.Communication;

namespace ClimbTrackApi.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        private readonly AuthenticationService authenticationService;

        public LoginController(AuthenticationService authenticationService)
        {
            this.authenticationService = authenticationService;
        }

        public async Task<IActionResult> Login([FromBody] UserCredentialResource userCredentialResource)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            
            ServiceResponse<AccessToken> response = await authenticationService.CreateAccessTokenAsync(userCredentialResource.EmailAddress, userCredentialResource.Password);
            if (!response.Success)
            {
                return BadRequest(response.Message);
            }
            AccessToken accessToken = response.Model;
            var accessTokenDto = new AccessTokenDto
            {
                AccessToken = accessToken.Token,
                RefreshToken = accessToken.RefreshToken.Token,
                RefreshTokenExpiration = accessToken.RefreshToken.Expiration
            };
            return Ok(accessTokenDto);
        }

        [HttpPost("refresh")]
        public async Task<IActionResult> RefreshAccessToken([FromBody] RefreshTokenResource refreshTokenResource)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            ServiceResponse<AccessToken> response = await authenticationService.RefreshTokenAsync(refreshTokenResource.Token);
            
            if (response.Model == null)
            {
                return BadRequest(response.Message);
            }
            AccessToken accessToken = response.Model;
            var tokenResource = new AccessTokenDto
            {
                AccessToken = accessToken.Token,
                RefreshToken = accessToken.RefreshToken.Token,
                RefreshTokenExpiration = accessToken.RefreshToken.Expiration
            };
            
            return Ok(tokenResource);
        }

        [HttpPost("revoke")]
        public async Task<IActionResult> RevokeRefreshToken([FromBody] RevokeTokenResource revokeTokenResource)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            await authenticationService.RevokeRefreshTokenAsync(revokeTokenResource.Token);
            return NoContent();
        }
    }
}