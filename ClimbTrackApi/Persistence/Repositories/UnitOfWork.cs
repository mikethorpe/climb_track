using System.Threading.Tasks;
using ClimbTrackApi.Domain.Interfaces;
using ClimbTrackApi.Persistence.Contexts;

namespace ClimbTrackApi.Persistence.Repositories
{
    public class UnitOfWork : IUnitOfWork
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
