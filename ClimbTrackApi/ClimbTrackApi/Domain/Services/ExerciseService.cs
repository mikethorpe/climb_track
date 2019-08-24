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
            return _exerciseRepository.FindByIdAsync(id);
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

        public async Task<SaveExerciseResponse> UpdateAsync(int id, Exercise exercise)
        {
            var existingExercise = await _exerciseRepository.FindByIdAsync(id);

            if (existingExercise == null) return new SaveExerciseResponse("Exercise not found");

            existingExercise.Name = exercise.Name;
            existingExercise.Reps = exercise.Reps;
            existingExercise.Sets = exercise.Sets;
            existingExercise.Notes = exercise.Notes;

            try
            {
                _exerciseRepository.UpdateAsync(existingExercise);
                await _unitOfWork.CompleteAsync();
                return new SaveExerciseResponse(existingExercise);
            }
            catch (Exception ex)
            {
                return new SaveExerciseResponse($"Error updating exercise: ${ex.Message}");
            }
        }
    }
}
