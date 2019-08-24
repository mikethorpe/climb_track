using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using ClimbTrackApi.Domain.Models;
using ClimbTrackApi.Domain.Services;
using ClimbTrackApi.Extensions;
using ClimbTrackApi.Resources;
using Microsoft.AspNetCore.Mvc;

namespace ClimbTrackApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ExerciseController : ControllerBase
    {
        private readonly IExerciseService _exerciseService;
        private readonly IMapper _mapper;

        public ExerciseController(IExerciseService exerciseService, IMapper mapper)
        {
            _exerciseService = exerciseService;
            _mapper = mapper;
        }

        [HttpGet("{id}")]
        public async Task<ExerciseResource> GetExercise(int id)
        {
            var exercise = await _exerciseService.GetExercise(id);
            var resource = _mapper.Map<Exercise, ExerciseResource>(exercise); 
            return resource;
        }

        [HttpGet]
        public async Task<ICollection<Exercise>> GetExercises()
        {
            return await _exerciseService.ListAsync();
        }

        [HttpPost]
        public async Task<IActionResult> CreateExercise([FromBody] SaveExerciseResource resource)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.GetErrorMessages());
            }

            Exercise exercise;

            try
            {

            exercise =_mapper.Map<SaveExerciseResource, Exercise>(resource);
            }
            catch (System.Exception ex)
            {
                var dsalkfds = ex.Message;
                throw;
            }
            var result = await _exerciseService.SaveAsync(exercise);

            if (!result.Success)
            {
                return BadRequest(result.Message);
            }

            var exerciseResource = _mapper.Map<Exercise, ExerciseResource>(result.Exercise);
            return Ok(exerciseResource);
        }

        //[HttpGet("{id}")]hib
        //public async Task<ActionResult<Exercise>> GetAsync(int id)
        //{
        //    var exercise = await _context.Exercises.FindAsync(id);
        //    if (exercise == null) return NotFound(); 
        //    return exercise;
        //}
    }
}