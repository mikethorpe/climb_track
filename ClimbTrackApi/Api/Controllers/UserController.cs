using System.Threading.Tasks;
using AutoMapper;
using ClimbTrackApi.Api.Extensions;
using ClimbTrackApi.Api.Resources;
using Microsoft.AspNetCore.Mvc;
using ClimbTrackApi.Domain.Models;
using ClimbTrackApi.Auth.Services;

namespace ClimbTrackApi.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private UserService _userService;
        private IMapper _mapper;

        public UserController(UserService userService, IMapper mapper)
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

            User user = _mapper.Map<UserCredentialResource, User>(userCredentialResource);

            var result = await _userService.CreateUserAsync(RoleEnum.USER, user);

            if (!result.Success) return BadRequest(result.Message);

            // TODO: user resource should contain list of roles - user may have multiple
            var userResource = _mapper.Map<User, UserResource>(result.Entity);

            return Ok(userResource);

        }
    }
}