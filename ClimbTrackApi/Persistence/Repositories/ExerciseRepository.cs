using ClimbTrackApi.Domain.Interfaces;
using ClimbTrackApi.Domain.Models;
using ClimbTrackApi.Persistence.Contexts;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ClimbTrackApi.Persistence.Repositories
{
    public class ExerciseRepository : BaseRepository, IExerciseRepository
    {
        public ExerciseRepository(ClimbTrackContext context) : base(context)
        {

        }

        public async Task AddAsync(Exercise exercise)
        {
            await context.AddAsync(exercise);
        }

        public async Task<Exercise> FindByIdAsync(int id)
        {
            return await context.Exercises.FindAsync(id);
        }

        public async Task<ICollection<Exercise>> ListAsync()
        {
            return await context.Exercises.ToListAsync();
        }

        public void Update(Exercise exercise)
        {
             context.Exercises.Update(exercise);
        }

        public void Remove(Exercise exercise)
        {
            context.Exercises.Remove(exercise);
        }
    }
}
