using System.Threading.Tasks;

namespace ClimbTrackApi.Domain.Repositories
{
    public interface IUnitOfWork
    {
        Task CompleteAsync();
    }
}
