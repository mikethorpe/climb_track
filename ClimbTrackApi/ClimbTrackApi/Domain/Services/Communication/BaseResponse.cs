namespace ClimbTrackApi.Domain.Services.Communication
{
    public class BaseResponse
    {
        public bool Success { get; protected set; }
        public string Message { get; protected set; }

        public abstract BaseResponse(bool succes, string message)
        {
            Success = succes;
            Message = message;
        }
    }
}
