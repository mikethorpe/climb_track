using ClimbTrackApi.Domain.Communication;
using ClimbTrackApi.Persistence.Models;
using ClimbTrackApi.Persistence.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ClimbTrackApi.Domain.Services
{
    public class StyleService
    {
        private readonly StyleRepository styleRepository;

        public StyleService(StyleRepository styleRepository)
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