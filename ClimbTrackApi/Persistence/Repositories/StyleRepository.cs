using ClimbTrackApi.Domain.Models;
using ClimbTrackApi.Persistence.Contexts;
using ClimbTrackApi.Domain.Interfaces;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ClimbTrackApi.Persistence.Repositories
{
    public class StyleRepository : BaseRepository, IStyleRepository
    {
        public StyleRepository(ClimbTrackContext context) : base(context)
        {

        }

        public async Task AddAsync(Style style)
        {
            await _context.AddAsync(style);
        }

        public async Task<Style> FindByIdAsync(int id)
        {
            return await _context.Styles.FindAsync(id);
        }

        public async Task<ICollection<Style>> ListAsync()
        {
            return await _context.Styles.
                Select(s => new Style
                {
                    Id = s.Id,
                    Description = s.Description
                })
                .ToListAsync();
        }

        public void Update(Style style)
        {
            _context.Styles.Update(style);
        }

        public void Remove(Style style)
        {
            _context.Styles.Remove(style);
        }
    }

}
