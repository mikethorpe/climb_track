using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;

namespace ClimbTrackApi.Api
{
    public class Program
    {
        public static void Main(string[] args)
        {
            CreateWebHostBuilder(args).Build().Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args) =>
            WebHost.CreateDefaultBuilder(args)
                //.UseUrls("https://0.0.0.0:6001")
                .UseStartup<Startup>();
    }
}
