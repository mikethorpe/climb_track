using ClimbTrackApi.Domain.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Domain.Interfaces
{
    public interface IClimbingSessionService
    {
        Task<ClimbingSession> SaveAsync(ClimbingSession climbingSession);
        Task<ICollection<ClimbingSession>> ListAsync();
    }
}
