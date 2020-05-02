using ClimbTrackApi.Domain.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.DependencyInjection;
using AutoMapper;
using ClimbTrackApi.Api.Mapping;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System;
using ClimbTrackApi.Auth.Helpers;
using ClimbTrackApi.Domain.Interfaces;
using ClimbTrackApi.Auth.Services;
using ClimbTrackApi.Auth.Interfaces;
using ClimbTrackApi.Persistence.Repositories;
using TokenHandler = ClimbTrackApi.Auth.Helpers.TokenHandler;
using ClimbTrackApi.Persistence.Contexts;
using Microsoft.EntityFrameworkCore;
using Domain.Interfaces;
using Microsoft.Extensions.Hosting;
using ClimbTrackApi.Auth.Models;

namespace ClimbTrackApi.Api
{
    public class Startup
    {
        private IWebHostEnvironment env;
        public Startup(IConfiguration configuration, IWebHostEnvironment env)
        {
            Configuration = configuration;
            this.env = env;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_3_0);
            services.AddDbContext<ClimbTrackContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("ClimbTrackDb")));
            
            // Inject services
            services.AddScoped<IExerciseService, ExerciseService>();
            services.AddScoped<IExerciseRepository, ExerciseRepository>();
            services.AddScoped<IRefreshTokenRepository, RefreshTokenRepository>();
            services.AddScoped<IAuthenticationService, AuthenticationService>();
            services.AddScoped<ITokenHandler, TokenHandler>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IUnitOfWork, UnitOfWork>();
            services.AddScoped<IStyleRepository, StyleRepository>();
            services.AddScoped<IStyleService, StyleService>();
            services.AddScoped<IClimbingSessionRepository, ClimbingSessionRepository>();
            services.AddScoped<IClimbingSessionService, ClimbingSessionService>();
            services.AddScoped(typeof(IPasswordHasher<>), typeof(PasswordHasher<>));
            services.AddAutoMapper(typeof(ModelToResourceProfile), typeof(ResourceToModelProfile));
            
            // JWT authentication
            var signingConfigurations = new SigningConfigurations();
            services.AddSingleton(signingConfigurations);
            services.Configure<TokenOptions>(Configuration.GetSection("TokenOptions"));
            var tokenOptions = Configuration.GetSection("TokenOptions").Get<TokenOptions>();
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(jwtBearerOptions =>
                {
                    jwtBearerOptions.TokenValidationParameters = new TokenValidationParameters()
                    {
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = "ClimbTrackApi",
                        ValidAudience = "ClimbTrackClient",
                        IssuerSigningKey = signingConfigurations.Key,
                        ClockSkew = TimeSpan.Zero
                    };
                }
            );

            // CORS configuration
            services.AddCors(
                c =>  c.AddPolicy(
                    "AllowOrigin", options => 
                        options
                            .AllowAnyOrigin()
                            .AllowAnyHeader()
                            .AllowAnyMethod()));

            // Serve spa static files
            services.AddSpaStaticFiles(configuration => {
                configuration.RootPath = Configuration.GetSection("StaticFiles").GetSection("ClientBuildFolder").Value;
            });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                // The default HSTS value is 30 days. You may want to change this for production scenarios, see https://aka.ms/aspnetcore-hsts.
                app.UseHsts();
            }

            app.UseAuthentication();
            app.UseCors("AllowOrigin");
            app.UseHttpsRedirection();
            app.UseRouting();
            app.UseEndpoints(endpoints => endpoints.MapControllers());

            app.UseSpaStaticFiles();
            app.UseSpa(spa =>
            {
                if (env.IsDevelopment())
                {
                    spa.UseProxyToSpaDevelopmentServer("http://localhost:3000/");
                }
            });
        }
    }
}
