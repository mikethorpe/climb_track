using ClimbTrackApi.Domain.Communication;
using ClimbTrackApi.Persistence.Models;
using ClimbTrackApi.Persistence.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ClimbTrackApi.Domain.Services
{
    public class ClimbingSessionService
    {
        private readonly ClimbingSessionRepository climbingSessionRepository;
        private readonly UserRepository userRepository;
        private readonly UnitOfWork UnitOfWork;

        public ClimbingSessionService(ClimbingSessionRepository climbingSessionRepository, UserRepository userRepository, UnitOfWork UnitOfWork)
        {
            this.climbingSessionRepository = climbingSessionRepository;
            this.userRepository = userRepository;
            this.UnitOfWork = UnitOfWork;
        }

        public async Task<ServiceResponse<IEnumerable<ClimbingSession>>> ListAsync(string emailAddress)
        {
            User user = userRepository.FindByEmailAddress(emailAddress);
            if (user == null)
            {
                return new ServiceResponse<IEnumerable<ClimbingSession>>("User cannot be found by email address");
            }
            IEnumerable<ClimbingSession> climbingSessions = await climbingSessionRepository.ListAsync(user.Id);
            return new ServiceResponse<IEnumerable<ClimbingSession>>(climbingSessions);
        }

        public async Task<ServiceResponse<ClimbingSession>> SaveAsync(ClimbingSession climbingSession, string emailAddress)
        {
            User user = userRepository.FindByEmailAddress(emailAddress);
            if (user == null)
            {
                return new ServiceResponse<ClimbingSession>("User cannot be found by email address");
            }
            climbingSession.UserId = user.Id;
            ClimbingSession savedClimbingSession = await climbingSessionRepository.AddAsync(climbingSession);
            await UnitOfWork.CompleteAsync();
            return new ServiceResponse<ClimbingSession>(savedClimbingSession);
        }
    }
}
