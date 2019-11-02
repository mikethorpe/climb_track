using AutoMapper;
using ClimbTrackApi.Auth.Models;
using ClimbTrackApi.Domain.Models;
using ClimbTrackApi.Resources;

namespace ClimbTrackApi.Mapping
{
    public class ResourceToModelProfile : Profile
    {
        public ResourceToModelProfile()
        {
            CreateMap<SaveExerciseResource, Exercise>();
            CreateMap<UserCredentialResource, User>();
        }
    }
}
