using ClimbTrackApi.Domain.Models;
using ClimbTrackApi.Persistence.Contexts;
using ClimbTrackApi.Persistence.Repositories;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ClimbTrackApi.Domain.Repositories
{
    public class ExerciseRepository : BaseRepository, IExerciseRepository
    {
        public ExerciseRepository(ClimbTrackContext context) : base(context)
        {

        }

        public async Task AddAsync(Exercise exercise)
        {
            await _context.AddAsync(exercise);
        }

        public async Task<Exercise> FindByIdAsync(int id)
        {
            return await _context.Exercises.FindAsync(id);
        }

        public async Task<ICollection<Exercise>> ListAsync()
        {
            return await _context.Exercises.ToListAsync();
        }

        public void UpdateAsync(Exercise exercise)
        {
             _context.Exercises.Update(exercise);
        }
    }
}
