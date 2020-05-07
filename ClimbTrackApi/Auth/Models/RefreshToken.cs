using System;
using System.Text.Json.Serialization;

namespace ClimbTrackApi.Auth.Models
{
    public class RefreshToken
    {
        [JsonIgnore]
        public int Id { get; set; }
        [JsonIgnore]
        public int UserId { get; set; }
        [JsonIgnore]
        public DateTime? Deleted { get; set; }
        public string Token { get; set; }
        public DateTime Expiration { get; set; }

        public bool IsExpired()
        {
            if (DateTime.UtcNow > Expiration) return true;
            return false;
        }
    }
}
