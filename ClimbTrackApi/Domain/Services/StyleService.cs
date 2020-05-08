using ClimbTrackApi.Domain.Communication;
using ClimbTrackApi.Domain.Interfaces;
using ClimbTrackApi.Domain.Models;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ClimbTrackApi.Domain.Services
{
    public class StyleService
    {
        private readonly IStyleRepository styleRepository;

        public StyleService(IStyleRepository styleRepository)
        {
            this.styleRepository = styleRepository;
        }

        public async Task<ServiceResponse<IEnumerable<Style>>> ListAsync()
        {
            IEnumerable<Style> styles = await styleRepository.ListAsync();
            return new ServiceResponse<IEnumerable<Style>>(styles);
        }
    }
}