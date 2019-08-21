using AutoMapper;
using ClimbTrackApi.Domain.Models;
using ClimbTrackApi.Resources;

namespace ClimbTrackApi.Mapping
{
    public class ResourceToModelProfile : Profile
    {
        public ResourceToModelProfile()
        {
            CreateMap<SaveExerciseResource, Exercise>();
        }
    }
}
