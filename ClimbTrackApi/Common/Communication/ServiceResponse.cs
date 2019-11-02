namespace ClimbTrackApi.Common.Communication
{
    public class ServiceResponse<T> : BaseResponse
    {
        public T Entity { get; private set; }

        private ServiceResponse(bool success, string message, T entity): base(success, message)
        {
            Entity = entity;
        }

        public ServiceResponse(T entity) : this(true, string.Empty, entity) { }

        public ServiceResponse(string messgae) : this(false, messgae, default(T)) { }
    }
}
