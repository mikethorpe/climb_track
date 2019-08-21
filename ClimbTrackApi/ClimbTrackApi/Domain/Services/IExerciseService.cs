using ClimbTrackApi.Domain.Models;
using ClimbTrackApi.Domain.Services.Communication;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ClimbTrackApi.Domain.Services
{
    public interface IExerciseService
    {
        Task<ICollection<Exercise>> ListAsync();
        Task<Exercise> GetExercise(int id);
        Task<SaveExerciseResponse> SaveAsync(Exercise exercise);
    }
}
