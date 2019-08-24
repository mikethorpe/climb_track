using System.Threading.Tasks;
using ClimbTrackApi.Domain.Repositories;
using ClimbTrackApi.Persistence.Contexts;

namespace ClimbTrackApi.Persistence.Repositories
{
    public class UnitOfWork: IUnitOfWork
    {
        private readonly ClimbTrackContext _context;

        public UnitOfWork(ClimbTrackContext context)
        {
            _context = context;
        }

        public async Task CompleteAsync()
        {
            await _context.SaveChangesAsync();
        }
    }
}
