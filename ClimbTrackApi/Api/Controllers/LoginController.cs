using System.Threading.Tasks;
using AutoMapper;
using ClimbTrackApi.Auth.Interfaces;
using ClimbTrackApi.Auth.Models;
using ClimbTrackApi.Api.Resources;
using Microsoft.AspNetCore.Mvc;
using ClimbTrackApi.Common.Communication;
using ClimbTrackApi.Auth.Services;

namespace ClimbTrackApi.Api.Controllers
{
    [Route("api/login")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        public AuthenticationService authenticationService { get; set; }
        public IMapper mapper { get; set; }

        public LoginController(AuthenticationService authenticationService, IMapper mapper)
        {
            this.authenticationService = authenticationService;
            this.mapper = mapper;
        }

        public async Task<IActionResult> LoginAsync([FromBody] UserCredentialResource userCredentialResource)
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
            var accessTokenResource = mapper.Map<AccessToken, AccessTokenResource>(response.Entity);
            return Ok(accessTokenResource);
        }

        [HttpPost("refresh")]
        public async Task<IActionResult> RefreshAccessToken([FromBody] RefreshTokenResource refreshTokenResource)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            ServiceResponse<AccessToken> response = await authenticationService.RefreshTokenAsync(refreshTokenResource.Token);

            if (response.Entity == null)
            {
                return BadRequest(response.Message);
            }
            var tokenResource = mapper.Map<AccessToken, AccessTokenResource>(response.Entity);
            return Ok(tokenResource);
        }

        [HttpPost("revoke")]
        public async Task<IActionResult> RevokeRefreshTokenAsync([FromBody] RevokeTokenResource revokeTokenResource)
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