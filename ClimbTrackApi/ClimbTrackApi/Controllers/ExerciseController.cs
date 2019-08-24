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
        public async Task<IActionResult> GetExercise(int id)
        {
            var exercise = await _exerciseService.GetExercise(id);

            if (exercise == null) return NotFound();

            var resource = _mapper.Map<Exercise, ExerciseResource>(exercise);

            return Ok(resource);
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

            var exercise = _mapper.Map<SaveExerciseResource, Exercise>(resource);
            var result = await _exerciseService.SaveAsync(exercise);

            if (!result.Success)
            {
                return BadRequest(result.Message);
            }

            var exerciseResource = _mapper.Map<Exercise, ExerciseResource>(result.Exercise);
            return Ok(exerciseResource);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutAsync(int id, [FromBody] SaveExerciseResource resource)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.GetErrorMessages());
            }

            var exercise = _mapper.Map<SaveExerciseResource, Exercise>(resource);
            var result = await _exerciseService.UpdateAsync(id, exercise);

            if (!result.Success)
            {
                return BadRequest(result.Message);
            }

            var exerciseResource = _mapper.Map<Exercise, ExerciseResource>(result.Exercise);
            return Ok(exerciseResource);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState.GetErrorMessages());
            }

            var result = await _exerciseService.DeleteAsync(id);

            if (!result.Success) return BadRequest(result.Message);

            var exerciseResource = _mapper.Map<Exercise, ExerciseResource>(result.Exercise);
            return Ok(exerciseResource);
        }

    }
}