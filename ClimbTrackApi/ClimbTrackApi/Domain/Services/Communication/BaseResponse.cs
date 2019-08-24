namespace ClimbTrackApi.Domain.Services.Communication
{
    public abstract class BaseResponse
    {
        public bool Success { get; protected set; }
        public string Message { get; protected set; }

        public BaseResponse(bool succes, string message)
        {
            Success = succes;
            Message = message;
        }
    }
}
