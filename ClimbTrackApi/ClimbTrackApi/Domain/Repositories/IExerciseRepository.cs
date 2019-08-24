using ClimbTrackApi.Domain.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ClimbTrackApi.Domain.Repositories
{
    public interface IExerciseRepository
    {
        Task<ICollection<Exercise>> ListAsync();
        Task<Exercise> FindByIdAsync(int id);
        Task AddAsync(Exercise exercise);
        void Update(Exercise exercise);
        void Remove(Exercise exercise);
    }    
}
