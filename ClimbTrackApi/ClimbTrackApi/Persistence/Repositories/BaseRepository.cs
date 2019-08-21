﻿using ClimbTrackApi.Persistence.Contexts;

namespace ClimbTrackApi.Persistence.Repositories
{
    public abstract class BaseRepository
    {
        protected readonly ClimbTrackContext _context;

        public BaseRepository(ClimbTrackContext context)
        {
            _context = context;
        }
    }
}
