using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using ClimbTrackApi.Domain.Models;
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
        public async Task<IActionResult> GetClimbingSessionsAsync()
        {
            ClaimsIdentity identity = HttpContext.User.Identity as ClaimsIdentity;
            string emailAddress = identity.Claims.First(c => c.Type.Contains("nameidentifier")).Value;

            IEnumerable<ClimbingSession> climbingSessions = await climbingSessionService.ListAsync(emailAddress);
            if (climbingSessions.Any())
            {
                var climbingSessionsDto = climbingSessions.Select(cs => new
                {
                    cs.Id,
                    DateTime = cs.DateTime.ToString("ddd MMM dd yyyy"),
                    cs.Climbs,
                    cs.MaxGrade
                });

                return Ok(climbingSessionsDto);
            }
            return NoContent();
        }

        [HttpPost]
        public async Task<IActionResult> CreateClimbingSessionAsync([FromBody] ClimbingSession climbingSession)
        {
            ClaimsIdentity identity = HttpContext.User.Identity as ClaimsIdentity;
            string emailAddress = identity.Claims.First(c => c.Type.Contains("nameidentifier")).Value;
            ClimbingSession savedClimbingSession = await climbingSessionService.SaveAsync(climbingSession, emailAddress);
            return Ok(savedClimbingSession.Id);
        }
    }
}