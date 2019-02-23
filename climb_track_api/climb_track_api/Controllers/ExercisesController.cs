using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using climb_track_api.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace climb_track_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExercisesController : ControllerBase
    {
        private readonly ClimbTrackContext _context;

        public ExercisesController(ClimbTrackContext context)
        {
            _context = context;

            //Create a new exercise if one does not exist
            //if (_context.Exercises.Count() == 0)
            //{
            //    _context.Exercises.Add(new Exercise{ Name = "Cool exercse", Reps = 1, Sets = 2 });
            //    _context.SaveChanges();
            //}
        }

        // GET: api/exercises
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Exercise>>> GetExercises()
        {
            return await _context.Exercises.ToListAsync();
        }

        // GET: api/exercises/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Exercise>> GetExercise(int id)
        {
            var exercise = await _context.Exercises.FindAsync(id);
            if (exercise == null)
            {
                return NotFound();
            }
            return exercise;
        }

        [HttpPost]
        public async Task<ActionResult<Exercise>> CreateExercise(Exercise exercise)
        {
            _context.Exercises.Add(exercise);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(GetExercise), new { id = exercise.ID }, exercise);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateExercise(int id, Exercise exercise)
        {
            if (id != exercise.ID)
            {
                return BadRequest();
            }

            _context.Entry(exercise).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult> DeleteExercise(int id)
        {
            var exercise = await _context.Exercises.FindAsync(id);

            if (exercise == null)
            {
                return NotFound();
            }

            _context.Exercises.Remove(exercise);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}