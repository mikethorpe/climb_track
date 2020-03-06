using AutoMapper;
using ClimbTrackApi.Auth.Models;
using ClimbTrackApi.Domain.Models;
using ClimbTrackApi.Api.Resources;

namespace ClimbTrackApi.Api.Mapping
{
    public class ModelToResourceProfile : Profile
    {
        public ModelToResourceProfile()
        {
            CreateMap<Exercise, ExerciseResource>();
            CreateMap<User, UserResource>()
                .ForMember(ur => ur.Role, opt => opt.MapFrom(u => u.Role.ToString()));
            CreateMap<AccessToken, AccessTokenResource>();
        } 
    }
    
}
