using ClimbTrackApi.Domain.Models;

namespace ClimbTrackApi.Domain.Services.Communication
{
    public class SaveExerciseResponse : BaseResponse
    {
        public Exercise Exercise{ get; private set; }

        private SaveExerciseResponse(bool success, string message, Exercise exercise): base(success, message)
        {
            Exercise = exercise;
        }

        public SaveExerciseResponse(Exercise exercise) : this(true, string.Empty, exercise) { }

        public SaveExerciseResponse(string messgae) : this(false, messgae, null) { }
    }
}
