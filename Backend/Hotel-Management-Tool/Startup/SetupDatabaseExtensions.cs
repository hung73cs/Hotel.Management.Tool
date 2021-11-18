using Hotel.Management.Tool.Core.Configuration;
using Hotel.Management.Tool.Core.Database;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Npgsql;

namespace Hotel.Management.Tool.Startup
{
    public static class SetupDatabaseExtensions
    {
        public static void SetupDatabases(this IServiceCollection services, PostgreSqlSettings database)
        {
            var connection = new NpgsqlConnectionStringBuilder(database.ConnectionString)
            {
                Pooling = true,
                MaxPoolSize = database.MaxPoolSize,
                MinPoolSize = database.MinPoolSize
            };

            services.AddDbContext<AppDbContext>(options =>
            {
                options.UseNpgsql(connection.ToString(), options => options.EnableRetryOnFailure());
            }
            , ServiceLifetime.Transient);
        }
    }
}
