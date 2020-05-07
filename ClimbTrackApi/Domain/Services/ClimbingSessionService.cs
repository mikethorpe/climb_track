using ClimbTrackApi.Domain.Interfaces;
using ClimbTrackApi.Domain.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ClimbTrackApi.Domain.Services
{
    public class ClimbingSessionService
    {
        private readonly IClimbingSessionRepository climbingSessionRepository;
        private readonly IUserRepository userRepository;
        private readonly IUnitOfWork unitOfWork;

        public ClimbingSessionService(IClimbingSessionRepository climbingSessionRepository, IUserRepository userRepository, IUnitOfWork unitOfWork)
        {
            this.climbingSessionRepository = climbingSessionRepository;
            this.userRepository = userRepository;
            this.unitOfWork = unitOfWork;
        }

        public async Task<ICollection<ClimbingSession>> ListAsync(string emailAddress)
        {
            User user = userRepository.FindByEmailAddress(emailAddress);
            return await climbingSessionRepository.ListAsync(user.Id);
        }

        public async Task<ClimbingSession> SaveAsync(ClimbingSession climbingSession, string emailAddress)
        {
            User user = userRepository.FindByEmailAddress(emailAddress);
            climbingSession.UserId = user.Id;
            ClimbingSession savedClimbingSession = await climbingSessionRepository.AddAsync(climbingSession);
            await unitOfWork.CompleteAsync();
            return savedClimbingSession;
        }
    }
}
