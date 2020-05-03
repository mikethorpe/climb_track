using System.Threading.Tasks;
using AutoMapper;
using ClimbTrackApi.Auth.Interfaces;
using ClimbTrackApi.Auth.Models;
using ClimbTrackApi.Api.Extensions;
using ClimbTrackApi.Api.Resources;
using Microsoft.AspNetCore.Mvc;

namespace ClimbTrackApi.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private IUserService _userService;
        private IMapper _mapper;

        public UserController(IUserService userService, IMapper mapper)
        {
            _userService = userService;
            _mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> CreateUserAsync([FromBody] UserCredentialResource userCredentialResource)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.GetErrorMessages());
            }

            var user = _mapper.Map<UserCredentialResource, User>(userCredentialResource);

            var result = await _userService.CreateUserAsync(RoleEnum.USER, user);

            if (!result.Success) return BadRequest(result.Message);

            // TODO: user resource should contain list of roles - user may have multiple
            var userResource = _mapper.Map<User, UserResource>(result.Entity);

            return Ok(userResource);

        }
    }
}