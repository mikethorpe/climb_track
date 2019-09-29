using System.Threading.Tasks;
using AutoMapper;
using ClimbTrackApi.Domain.Models;
using ClimbTrackApi.Domain.Services;
using ClimbTrackApi.Resources;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ClimbTrackApi.Controllers
{
    [Route("api/login")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        public IAuthenticationService _authenticationService { get; set; }
        public IMapper _mapper { get; set; }
        public LoginController(IAuthenticationService authenticationService, IMapper mapper)
        {
            _authenticationService = authenticationService;
            _mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> LoginAsync([FromBody] UserCredentialResource userCredentialResource)
        {

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var response = await _authenticationService.CreateAccessTokenAsync(userCredentialResource.EmailAddress, userCredentialResource.Password);

            if (!response.Success)
            {
                return BadRequest(response.Message);
            }

            var accessTokenResource = _mapper.Map<AccessToken, AccessTokenResource>(response.Entity);

            return Ok(accessTokenResource);
        }

        // add route to request new access token by providing refresh token
        [HttpGet("/token/refresh")]
        public async Task<IActionResult> RefreshToken([FromBody] RefreshTokenResource refreshTokenResource)
        {
            if (!ModelState.IsValid) return BadRequest(ModelState);

            var response = await _authenticationService.RefreshTokenAsync(refreshTokenResource.Token, refreshTokenResource.EmailAddress);

            if (response.Entity == null) return BadRequest(response.Message);

            var tokenResource = _mapper.Map<AccessToken, AccessTokenResource>(response.Entity);
            return Ok(tokenResource);
        }

        // add route to revoke access token by providing refresh token      
    }
}