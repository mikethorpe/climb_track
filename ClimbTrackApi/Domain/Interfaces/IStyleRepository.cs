using ClimbTrackApi.Domain.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ClimbTrackApi.Domain.Interfaces
{
    public interface IStyleRepository
    {
        Task<ICollection<Style>> ListAsync();
        Task<Style> FindByIdAsync(int id);
        Task AddAsync(Style style);
        void Update(Style style);
        void Remove(Style style);
    }
}

