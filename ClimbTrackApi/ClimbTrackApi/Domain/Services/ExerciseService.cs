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

        public async Task<ExerciseResponse> DeleteAsync(int id)
        {
            var exercise = await _exerciseRepository.FindByIdAsync(id);

            if (exercise == null) return new ExerciseResponse("Exercise not found");

            try
            {
                _exerciseRepository.Remove(exercise);
                await _unitOfWork.CompleteAsync();
                return new ExerciseResponse(exercise);
            }
            catch (Exception ex)
            {
                return new ExerciseResponse($"Error when deleting exercise: {ex.Message}");
            }
        }

        public async Task<Exercise> GetExercise(int id)
        {
            return await _exerciseRepository.FindByIdAsync(id);
        }

        public async Task<ICollection<Exercise>> ListAsync()
        {
            return await _exerciseRepository.ListAsync();
        }

        public async Task<ExerciseResponse> SaveAsync(Exercise exercise)
        {
            try
            {
                await _exerciseRepository.AddAsync(exercise);
                await _unitOfWork.CompleteAsync();
                return new ExerciseResponse(exercise);

            }
            catch (Exception ex)
            {
                return new ExerciseResponse($"Error saving category: {ex.Message}");
            }
        }

        public async Task<ExerciseResponse> UpdateAsync(int id, Exercise exercise)
        {
            var existingExercise = await _exerciseRepository.FindByIdAsync(id);

            if (existingExercise == null) return new ExerciseResponse("Exercise not found");

            existingExercise.Name = exercise.Name;
            existingExercise.Reps = exercise.Reps;
            existingExercise.Sets = exercise.Sets;
            existingExercise.Notes = exercise.Notes;

            try
            {
                _exerciseRepository.Update(existingExercise);
                await _unitOfWork.CompleteAsync();
                return new ExerciseResponse(existingExercise);
            }
            catch (Exception ex)
            {
                return new ExerciseResponse($"Error updating exercise: ${ex.Message}");
            }
        }
    }
}
