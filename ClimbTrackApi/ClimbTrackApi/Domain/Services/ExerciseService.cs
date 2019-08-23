using ClimbTrackApi.Domain.Models;
using ClimbTrackApi.Domain.Repositories;
using ClimbTrackApi.Domain.Services.Communication;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ClimbTrackApi.Domain.Services
{
    public class ExerciseService : IExerciseService
    {

        IExerciseRepository _exerciseRepository;
        IUnitOfWork _unitOfWork;

        public ExerciseService(IExerciseRepository exerciseRepository, IUnitOfWork unitOfWork)
        {
            _exerciseRepository = exerciseRepository;
            _unitOfWork = unitOfWork;
        }

        public Task<Exercise> GetExercise(int id)
        {
            return _exerciseRepository.GetExercise(id);
        }

        public async Task<ICollection<Exercise>> ListAsync()
        {
            return await _exerciseRepository.ListAsync();
        }

        public async Task<SaveExerciseResponse> SaveAsync(Exercise exercise)
        {
            try
            {
                await _exerciseRepository.AddAsync(exercise);
                await _unitOfWork.CompleteAsync();
                return new SaveExerciseResponse(exercise);

            }
            catch (Exception ex)
            {
                return new SaveExerciseResponse($"Error saving category: {ex.Message}");
            }
        }
    }
}
