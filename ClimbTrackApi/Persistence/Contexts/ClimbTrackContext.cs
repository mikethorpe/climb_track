using ClimbTrackApi.Auth.Models;
using ClimbTrackApi.Domain.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Microsoft.Extensions.Configuration;
using WorkoutExercise = ClimbTrackApi.Domain.Models.WorkoutExercise;

namespace ClimbTrackApi.Persistence.Contexts
{
    public class ClimbTrackContext: DbContext
    {
        public DbSet<WorkoutExercise> Activities { get; set; }
        public DbSet<Exercise> Exercises { get; set; }
        public DbSet<Workout> Workouts { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<RefreshToken> RefreshTokens { get; set; }

        private IConfiguration _configuration;
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
            => optionsBuilder.UseNpgsql(_configuration.GetConnectionString("DefaultConnection"));


        public ClimbTrackContext(DbContextOptions<ClimbTrackContext> options, IConfiguration configuration) : base(options)
        {
            _configuration = configuration;

        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configure Exercise table and add seed data
            modelBuilder.Entity<Exercise>().HasKey(e => e.Id);
            modelBuilder.Entity<Exercise>()
                .Property(e => e.Name)
                .HasMaxLength(100)
                .HasDefaultValue(string.Empty);
            modelBuilder.Entity<Exercise>().HasData(
                new Exercise { Id = -1, Name = "Situps", Sets = 1, Reps = 2 },
                new Exercise { Id = -2, Name = "Super thigh burn", Sets = 2, Reps = 12 },
                new Exercise { Id = -3, Name = "Super extra exercise", Sets = 2, Reps = 12 }
            );

            // Configure Workout table and add seed data
            modelBuilder.Entity<Workout>().HasKey(w => w.Id);
            modelBuilder.Entity<Workout>()
                .Property(e => e.Name)
                .HasMaxLength(100)
                .HasDefaultValue(string.Empty);
            modelBuilder.Entity<Workout>().HasData(
                new Workout { Id = -1, Name = "Workout1" },
                new Workout { Id = -2, Name = "Workout2" },
                new Workout { Id = -3, Name = "Workout3" }
            );

            // Define join table between Workout and Exercise
            modelBuilder.Entity<WorkoutExercise>()
                .HasKey(we => new { we.WorkoutId, we.ExerciseId });

            modelBuilder.Entity<WorkoutExercise>()
                .HasOne(we => we.Workout)
                .WithMany(w => w.WorkoutExercises)
                .HasForeignKey(we => we.WorkoutId);
            
            modelBuilder.Entity<WorkoutExercise>()
                .HasOne(we => we.Exercise)
                .WithMany(e => e.WorkoutExercises)
                .HasForeignKey(we => we.ExerciseId);

            modelBuilder.Entity<User>().HasKey(u => u.Id);

            var roleConverter = new EnumToStringConverter<RoleEnum>();

            modelBuilder.Entity<User>()
                .Property(u => u.Role)
                .HasConversion(roleConverter);

            

        }
    }
}
