using ClimbTrackApi.Domain.Models;

namespace ClimbTrackApi.Domain.Services.Communication
{
    public class ExerciseResponse : BaseResponse
    {
        public Exercise Exercise{ get; private set; }

        private ExerciseResponse(bool success, string message, Exercise exercise): base(success, message)
        {
            Exercise = exercise;
        }

        public ExerciseResponse(Exercise exercise) : this(true, string.Empty, exercise) { }

        public ExerciseResponse(string messgae) : this(false, messgae, null) { }
    }
}
