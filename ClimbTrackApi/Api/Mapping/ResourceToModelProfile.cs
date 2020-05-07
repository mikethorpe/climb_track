using AutoMapper;
using ClimbTrackApi.Auth.Models;
using ClimbTrackApi.Domain.Models;
using ClimbTrackApi.Api.Resources;

namespace ClimbTrackApi.Api.Mapping
{
    public class ResourceToModelProfile : Profile
    {
        public ResourceToModelProfile()
        {
            CreateMap<UserCredentialResource, User>();
        }
    }
}
