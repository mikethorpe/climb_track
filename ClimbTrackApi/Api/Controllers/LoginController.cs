﻿using System.Threading.Tasks;
using AutoMapper;
using ClimbTrackApi.Auth.Interfaces;
using ClimbTrackApi.Auth.Models;
using ClimbTrackApi.Api.Resources;
using Microsoft.AspNetCore.Mvc;
using ClimbTrackApi.Common.Communication;

namespace ClimbTrackApi.Api.Controllers
{
    [Route("api/login")]
    [ApiController]
    public class LoginController : ControllerBase
    {
        public IAuthenticationService authenticationService { get; set; }
        public IMapper mapper { get; set; }

        public LoginController(IAuthenticationService authenticationService, IMapper mapper)
        {
            this.authenticationService = authenticationService;
            this.mapper = mapper;
        }

        [HttpPost]
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

        [HttpPost("api/token/refresh")]
        public async Task<IActionResult> RefreshAccessToken([FromBody] RefreshTokenResource refreshTokenResource)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            ServiceResponse<AccessToken> response = await authenticationService.RefreshTokenAsync(refreshTokenResource.Token, refreshTokenResource.EmailAddress);

            if (response.Entity == null)
            {
                return BadRequest(response.Message);
            }
            var tokenResource = mapper.Map<AccessToken, AccessTokenResource>(response.Entity);
            return Ok(tokenResource);
        }

        [HttpPost("api/token/revoke")]
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