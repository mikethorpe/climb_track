using ClimbTrackApi.Domain.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ClimbTrackApi.Domain.Interfaces
{
    public interface IClimbingSessionRepository
    {
        Task<ICollection<ClimbingSession>> ListAsync(int userId);
        Task<ClimbingSession> AddAsync(ClimbingSession climbingSession);
    }
}
