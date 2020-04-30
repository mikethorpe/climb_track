using ClimbTrackApi.Domain.Interfaces;
using ClimbTrackApi.Domain.Models;
using Domain.Interfaces;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ClimbTrackApi.Domain.Services
{
    public class ClimbingSessionService : IClimbingSessionService
    {
        private readonly IClimbingSessionRepository climbingSessionRepository;
        private readonly IUnitOfWork unitOfWork;

        public ClimbingSessionService(IClimbingSessionRepository climbingSessionRepository, IUnitOfWork unitOfWork)
        {
            this.climbingSessionRepository = climbingSessionRepository;
            this.unitOfWork = unitOfWork;
        }

        public async Task<ICollection<ClimbingSession>> ListAsync()
        {
            return await climbingSessionRepository.ListAsync();
        }

        public async Task<ClimbingSession> SaveAsync(ClimbingSession climbingSession)
        {
            ClimbingSession savedClimbingSession =  await climbingSessionRepository.AddAsync(climbingSession);
            await unitOfWork.CompleteAsync();
            return savedClimbingSession;
        }
    }
}
