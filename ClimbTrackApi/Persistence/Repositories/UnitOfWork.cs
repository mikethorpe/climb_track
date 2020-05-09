using System.Threading.Tasks;
using ClimbTrackApi.Persistence.Contexts;

namespace ClimbTrackApi.Persistence.Repositories
{
    public class UnitOfWork
    {
        private readonly ClimbTrackContext context;

        public UnitOfWork(ClimbTrackContext context)
        {
            this.context = context;
        }

        public async Task CompleteAsync()
        {
            await context.SaveChangesAsync();
        }
    }
}
