using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using ClimbTrackApi.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ClimbTrackApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExerciseController : ControllerBase
    {
        private readonly ClimbTrackContext _context;
        public ExerciseController(ClimbTrackContext context)
        {
            _context = context;

            if (_context.Exercises.Count() == 0)
            {
                _context.Exercises.Add(new Exercise { Name = "Situps", Sets = 1, Reps = 2 });
                _context.Exercises.Add(new Exercise { Name = "Super Thigh burn", Sets = 2, Reps = 12 });
                _context.SaveChanges();
            }
        }

        public async Task<ActionResult<List<Exercise>>> GetExercises()
        {
            return await _context.Exercises.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Exercise>> GetAsync(int id)
        {
            var exercise = await _context.Exercises.FindAsync(id);
            if (exercise == null) return NotFound();
            return exercise;
        }
    }
}