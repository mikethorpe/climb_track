using ClimbTrackApi.Domain.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ClimbTrackApi.Domain.Interfaces
{
    public interface IStyleService
    {
        Task<IEnumerable<Style>> ListAsync();
    }
}
