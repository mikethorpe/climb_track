using System.Threading.Tasks;

namespace ClimbTrackApi.Domain.Repositories
{
    interface IUnitOfWork
    {
        Task CompleteAsync();
    }
}
