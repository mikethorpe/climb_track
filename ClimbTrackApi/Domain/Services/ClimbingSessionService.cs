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
        private readonly UnitOfWork unitOfWork;

        public ClimbingSessionService(ClimbingSessionRepository climbingSessionRepository, UserRepository userRepository, UnitOfWork unitOfWork)
        {
            this.climbingSessionRepository = climbingSessionRepository;
            this.userRepository = userRepository;
            this.unitOfWork = unitOfWork;
        }

        public async Task<ServiceResponse<IEnumerable<ClimbingSession>>> ListAsync(string emailAddress)
        {
            User user = await userRepository.FindByEmailAddress(emailAddress);
            if (user == null)
            {
                return new ServiceResponse<IEnumerable<ClimbingSession>>("User cannot be found by email address");
            }
            IEnumerable<ClimbingSession> climbingSessions = await climbingSessionRepository.ListAsync(user.Id);
            return new ServiceResponse<IEnumerable<ClimbingSession>>(climbingSessions);
        }

        public async Task<ServiceResponse<ClimbingSession>> SaveAsync(ClimbingSession climbingSession, string emailAddress)
        {
            User user = await userRepository.FindByEmailAddress(emailAddress);
            if (user == null)
            {
                return new ServiceResponse<ClimbingSession>("User cannot be found by email address");
            }
            climbingSession.UserId = user.Id;
            ClimbingSession savedClimbingSession = await climbingSessionRepository.AddAsync(climbingSession);
            await unitOfWork.CompleteAsync();
            return new ServiceResponse<ClimbingSession>(savedClimbingSession);
        }

        public async Task<ServiceResponse<int>> DeleteAsync(int climbingSessionId, string emailAddress)
        {
            User user = await userRepository.FindByEmailAddress(emailAddress);
            if (user == null)
            {
                return new ServiceResponse<int>("User cannot be found by email address");
            }
            ClimbingSession climbingSessionToDelete = await climbingSessionRepository.FindByIdAsync(climbingSessionId);
            if (climbingSessionToDelete == null)
            {
                return new ServiceResponse<int>("ClimbingSession not found");
            }
            if (climbingSessionToDelete.UserId != user.Id)
            {
                return new ServiceResponse<int>("User is not authorized to delete this climbing session");
            }
            bool deleted = await climbingSessionRepository.RemoveAsync(climbingSessionToDelete.Id);
            if (deleted)
            {
                await unitOfWork.CompleteAsync();
                return new ServiceResponse<int>(climbingSessionId);
            }
            return new ServiceResponse<int>("Error could not delete climbing session");
        }
    }
}
