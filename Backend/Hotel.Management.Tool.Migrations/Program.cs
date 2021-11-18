using Hotel.Management.Tool.Core.Database;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System;
using System.IO;
using System.Linq;
using System.Reflection;

namespace Hotel.Management.Tool.Migrations
{
    class Program
    {
        static void Main(string[] args)
        {
            var builder = new ConfigurationBuilder()
                .SetBasePath(Directory.GetCurrentDirectory())
                .AddJsonFile("appsettings.json", optional: false, reloadOnChange: true)
                .AddEnvironmentVariables();

            IConfigurationRoot configuration = builder.Build();

            var settings = new AppSettings();
            configuration.Bind(settings);

            Console.WriteLine(settings.Database.ConnectionString);

            if (args.Any(x => x.Equals("--update", StringComparison.OrdinalIgnoreCase)))
            {
                var optionsBuilder = new DbContextOptionsBuilder<AppDbContext>();
                optionsBuilder.UseNpgsql(settings.Database.ConnectionString, b => b.MigrationsAssembly(Assembly.GetExecutingAssembly().FullName));
                AppDbContext context = new AppDbContext(optionsBuilder.Options);

                Console.WriteLine("Migrating Database");
                context.Database.Migrate();
                Console.WriteLine("Migration Complete");
            }
        }
    }
}
