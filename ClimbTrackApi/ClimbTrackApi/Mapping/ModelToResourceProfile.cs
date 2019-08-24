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
        }
    }
    
}
