using ClimbTrackApi.Domain.Models;
using ClimbTrackApi.Persistence.Contexts;
using ClimbTrackApi.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ClimbTrackApi.Persistence.Repositories
{
    public class StyleRepository :  IStyleRepository
    {
        private readonly ClimbTrackContext context;

        public StyleRepository(ClimbTrackContext context)
        {
            this.context = context;
        }

        public async Task AddAsync(Style style)
        {
            await context.AddAsync(style);
        }

        public async Task<Style> FindByIdAsync(int id)
        {
            return await context.Styles.FindAsync(id);
        }

        public async Task<ICollection<Style>> ListAsync()
        {
            return await context.Styles.Select(s => new Style
                {
                    Id = s.Id,
                    Description = s.Description
                })
                .ToListAsync();
        }

        public void Update(Style style)
        {
            context.Styles.Update(style);
        }

        public void Remove(Style style)
        {
            context.Styles.Remove(style);
        }
    }

}
