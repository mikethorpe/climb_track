using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using ClimbTrackApi.Domain.Interfaces;
using ClimbTrackApi.Domain.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Internal;

namespace ClimbTrackApi.Api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StyleController : Controller
    {
        private readonly IStyleService styleService;

        public StyleController(IStyleService styleService)
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
