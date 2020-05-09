using System.Threading.Tasks;
using ClimbTrackApi.Api.Resources;
using Microsoft.AspNetCore.Mvc;
using ClimbTrackApi.Persistence.Models;
using ClimbTrackApi.Domain.Services;

namespace ClimbTrackApi.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly UserService userService;

        public UserController(UserService userService)
        {
            this.userService = userService;
        }

        [HttpPost]
        public async Task<IActionResult> CreateUserAsync([FromBody] UserCredentialResource userCredentialResource)
        {
            var userToSave = new User
            {
                EmailAddress = userCredentialResource.EmailAddress,
                Password = userCredentialResource.Password,
            };

            var response = await userService.CreateUserAsync(RoleEnum.USER, userToSave);

            if (!response.Success)
            {
                return BadRequest(response.Message);
            }

            User savedUser = response.Model;
            return Ok(savedUser.Id);
        }
    }
}