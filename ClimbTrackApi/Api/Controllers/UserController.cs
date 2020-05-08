using System.Threading.Tasks;
using AutoMapper;
using ClimbTrackApi.Api.Extensions;
using ClimbTrackApi.Api.Resources;
using Microsoft.AspNetCore.Mvc;
using ClimbTrackApi.Domain.Models;
using ClimbTrackApi.Domain.Services;

namespace ClimbTrackApi.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserService userService;
        private readonly IMapper mapper;

        public UserController(UserService userService, IMapper mapper)
        {
            this.userService = userService;
            this.mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> CreateUserAsync([FromBody] UserCredentialResource userCredentialResource)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.GetErrorMessages());
            }

            User user = mapper.Map<UserCredentialResource, User>(userCredentialResource);

            var result = await userService.CreateUserAsync(RoleEnum.USER, user);

            if (!result.Success) return BadRequest(result.Message);

            // TODO: user resource should contain list of roles - user may have multiple
            var userResource = mapper.Map<User, UserResource>(result.Entity);

            return Ok(userResource);

        }
    }
}