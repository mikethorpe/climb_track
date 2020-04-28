using ClimbTrackApi.Domain.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ClimbTrackApi.Domain.Interfaces
{
    public interface IClimbingSessionRepository
    {
        Task<ICollection<ClimbingSession>> ListAsync();
        Task AddAsync(ClimbingSession climbingSession);
    }
}
