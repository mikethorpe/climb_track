using ClimbTrackApi.Persistence.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Microsoft.Extensions.Configuration;

namespace ClimbTrackApi.Persistence.Contexts
{
    public class ClimbTrackContext : DbContext
    {
        public DbSet<Style> Styles { get; set; }
        public DbSet<Style> Climbs { get; set; }
        public DbSet<ClimbingSession> ClimbingSessions { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }
        private IConfiguration configuration;

        public ClimbTrackContext(DbContextOptions<ClimbTrackContext> options, IConfiguration configuration) : base(options)
        {
            this.configuration = configuration;
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>().HasKey(u => u.Id);
            
            modelBuilder.Entity<Style>().HasKey(s => s.Id);
            
            modelBuilder.Entity<Climb>().HasKey(s => s.Id);
            modelBuilder.Entity<Climb>()
                .HasOne(c => c.Style)
                .WithMany(c => c.Climbs);
            
            modelBuilder.Entity<ClimbingSession>().HasKey(s => s.Id);
            modelBuilder.Entity<ClimbingSession>().Property(cs => cs.Id).ValueGeneratedOnAdd();
            modelBuilder.Entity<ClimbingSession>()
                .HasMany(cs => cs.Climbs)
                .WithOne(c => c.ClimbingSession)
                .OnDelete(DeleteBehavior.Cascade);
            
            var roleConverter = new EnumToStringConverter<RoleEnum>();
            modelBuilder.Entity<User>()
                .Property(u => u.Role)
                .HasConversion(roleConverter);
        }
    }
}
