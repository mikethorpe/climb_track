﻿using System;

namespace ClimbTrackApi.Auth.Models
{
    public class RefreshToken
    {
        public int Id { get; set; }
        public string Token { get; set; }
        public DateTime Expiration { get; set; }
        public int UserId { get; set; }
        public DateTime? Deleted { get; set; }

        public bool IsExpired()
        {
            if (DateTime.UtcNow > Expiration) return true;
            return false;
        }
    }
}
