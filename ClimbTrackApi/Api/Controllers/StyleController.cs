using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ClimbTrackApi.Domain.Models;
using ClimbTrackApi.Domain.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Internal;

namespace ClimbTrackApi.Api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class StyleController : Controller
    {
        private readonly StyleService styleService;

        public StyleController(StyleService styleService)
        {
            this.styleService = styleService;
        }

        [HttpGet]
        public async Task<IActionResult> GetStylesAsync()
        {
            IEnumerable<Style> styles = await styleService.ListAsync();
            if (styles.Any())
            {
                return Ok(styles);
            }
            return NoContent();
        }
    }
}
