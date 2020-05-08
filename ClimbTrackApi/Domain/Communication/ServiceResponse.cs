namespace ClimbTrackApi.Domain.Communication
{
    public class ServiceResponse<T> : BaseResponse
    {
        public T Model { get; private set; }

        private ServiceResponse(bool success, string message, T model): base(success, message)
        {
            Model = model;
        }

        public ServiceResponse(T model) : this(true, string.Empty, model) { }

        public ServiceResponse(string messgae) : this(false, messgae, default(T)) { }
    }
}
