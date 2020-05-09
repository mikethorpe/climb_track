using ClimbTrackApi.Domain.Services;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System;
using ClimbTrackApi.Persistence.Repositories;
using ClimbTrackApi.Persistence.Contexts;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;
using ClimbTrackApi.Persistence.Models;

namespace ClimbTrackApi.Api
{
    public class Startup
    {
        private readonly IWebHostEnvironment env;
        public IConfiguration Configuration { get; }
        
        public Startup(IConfiguration configuration, IWebHostEnvironment env)
        {
            Configuration = configuration;
            this.env = env;
        }


        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_3_0);
            services.AddDbContext<ClimbTrackContext>(options =>
                options.UseSqlServer(Configuration.GetConnectionString("ClimbTrackDb")));
            
            // Inject services
            services.AddScoped<RefreshTokenRepository, RefreshTokenRepository>();
            services.AddScoped<AuthenticationService>();
            services.AddScoped<StyleService>();
            services.AddScoped<Domain.Services.TokenHandler>();
            services.AddScoped<UserRepository, UserRepository>();
            services.AddScoped<UserService>();
            services.AddScoped<UnitOfWork, UnitOfWork>();
            services.AddScoped<StyleRepository>();
            services.AddScoped<ClimbingSessionRepository>();
            services.AddScoped<ClimbingSessionService>();
            services.AddScoped(typeof(IPasswordHasher<>), typeof(PasswordHasher<>));
            
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

            app.UseCors("AllowOrigin");
            app.UseHttpsRedirection();
            app.UseAuthentication();
            app.UseRouting();
            app.UseAuthorization();
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
