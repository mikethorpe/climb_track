﻿using System;

namespace ClimbTrackApi.Domain.Models
{
    public class RefreshToken
    {
        public string Token { get; set; }
        public DateTime Expiration { get; set; }
    }
}
