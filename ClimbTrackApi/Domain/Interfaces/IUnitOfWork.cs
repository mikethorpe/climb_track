using System.Threading.Tasks;

namespace ClimbTrackApi.Domain.Interfaces
{
    public interface IUnitOfWork
    {
        Task CompleteAsync();
    }
}
