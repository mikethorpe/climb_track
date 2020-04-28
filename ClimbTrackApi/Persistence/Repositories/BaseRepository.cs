using ClimbTrackApi.Persistence.Contexts;

namespace ClimbTrackApi.Persistence.Repositories
{
    public abstract class BaseRepository
    {
        protected readonly ClimbTrackContext context;

        public BaseRepository(ClimbTrackContext context)
        {
            this.context = context;
        }
    }
}
