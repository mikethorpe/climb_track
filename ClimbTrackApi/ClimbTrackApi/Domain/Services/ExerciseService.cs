using ClimbTrackApi.Domain.Models;
using ClimbTrackApi.Domain.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ClimbTrackApi.Domain.Services
{
    public class ExerciseService : IExerciseService
    {

        IExerciseRepository _exerciseRepository;

        public ExerciseService(IExerciseRepository exerciseRepository)
        {
            _exerciseRepository = exerciseRepository;
        }

        public Task<Exercise> GetExercise(int id)
        {
            return _exerciseRepository.GetExercise(id);
        }

        public async Task<ICollection<Exercise>> ListAsync()
        {
            return await _exerciseRepository.ListAsync();
        }

    }
}
