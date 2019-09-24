using AutoMapper;
using ClimbTrackApi.Domain.Models;
using ClimbTrackApi.Resources;

namespace ClimbTrackApi.Mapping
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
