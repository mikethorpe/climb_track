using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ClimbTrackApi.Domain.Models;
using Domain.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ClimbTrackApi.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClimbingSessionController : ControllerBase
    {
        private readonly IClimbingSessionService climbingSessionService;

        public ClimbingSessionController(IClimbingSessionService climbingSessionService)
        {
            this.climbingSessionService = climbingSessionService;
        }

        [Authorize]
        [HttpGet]
        public async Task<IActionResult> GetClimbingSessionsAsync()
        {
            IEnumerable<ClimbingSession> climbingSessions = await climbingSessionService.ListAsync();
            if (climbingSessions.Any())
            {

                var climbingSessionsDto = climbingSessions.Select(cs => new
                {
                    Id = cs.Id,
                    DateTime = cs.DateTime.ToString("ddd MMM dd yyyy"),
                    Climbs = cs.Climbs,
                    MaxGrade = cs.MaxGrade
                });

                return Ok(climbingSessionsDto);
            }
            return NoContent();
        }

        [Authorize]
        [HttpPost]
        public async Task<IActionResult> CreateClimbingSessionAsync([FromBody] ClimbingSession climbingSession)
        {
            ClimbingSession savedClimbingSession = await climbingSessionService.SaveAsync(climbingSession);
            return Ok(savedClimbingSession.Id);
        }
    }
}