using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using ClimbTrackApi.Api.Resources;
using ClimbTrackApi.Domain.Communication;
using ClimbTrackApi.Persistence.Models;
using ClimbTrackApi.Domain.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ClimbTrackApi.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ClimbingSessionController : ControllerBase
    {
        private readonly ClimbingSessionService climbingSessionService;

        public ClimbingSessionController(ClimbingSessionService climbingSessionService)
        {
            this.climbingSessionService = climbingSessionService;
        }

        [HttpGet]
        public async Task<IActionResult> GetClimbingSessions()
        {
            ClaimsIdentity identity = HttpContext.User.Identity as ClaimsIdentity;
            string emailAddress = identity.Claims.First(c => c.Type.Contains("nameidentifier")).Value;
            ServiceResponse<IEnumerable<ClimbingSession>> response = await climbingSessionService.ListAsync(emailAddress);
            
            if (!response.Success)
            {
                return BadRequest(response.Message);
            }
            IEnumerable<ClimbingSession> climbingSessions = response.Model;
            if (climbingSessions.Any())
            {
                var climbingSessionsDto = climbingSessions.Select(cs => new ClimbingSessionDto
                {
                    Id = cs.Id,
                    DateTime = cs.DateTime.ToString("ddd MMM dd yyyy"),
                    Climbs = cs.Climbs,
                    MaxGrade = cs.MaxGrade
                }).ToList();
                return Ok(climbingSessionsDto);
            }
            return NoContent();
        }

        [HttpPost]
        public async Task<IActionResult> CreateClimbingSession([FromBody] ClimbingSession climbingSession)
        {
            ClaimsIdentity identity = HttpContext.User.Identity as ClaimsIdentity;
            string emailAddress = identity.Claims.First(c => c.Type.Contains("nameidentifier")).Value;
            ServiceResponse<ClimbingSession> response = await climbingSessionService.SaveAsync(climbingSession, emailAddress);
            if (!response.Success)
            {
                return BadRequest(response.Message);
            }
            return Ok(response.Model.Id);
        }

        [HttpDelete("{climbingSessionId}")]
        public async Task<IActionResult> DeleteClimbingSession(int climbingSessionId)
        {
            ClaimsIdentity identity = HttpContext.User.Identity as ClaimsIdentity;
            string emailAddress = identity.Claims.First(c => c.Type.Contains("nameidentifier")).Value;
            ServiceResponse<int> response = await climbingSessionService.DeleteAsync(climbingSessionId, emailAddress);

            if (!response.Success)
            {
                return Unauthorized(response.Message);
            }
            return NoContent();
        }
    }
}