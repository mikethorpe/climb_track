using ClimbTrackApi.Domain.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ClimbTrackApi.Domain.Repositories
{
    public interface IExerciseRepository
    {
        Task<ICollection<Exercise>> ListAsync();
        Task<Exercise> GetExercise(int id);
        Task AddExercise(Exercise exercise);
    }    
}
