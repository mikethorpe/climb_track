using ClimbTrackApi.Domain.Communication;
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
            await unitOfWork.CompleteAsync();
            return new ServiceResponse<ClimbingSession>(savedClimbingSession);
        }
    }
}
