using Hotel.Management.Tool.Core.Configuration;

namespace Hotel.Management.Tool.Core.Interfaces
{
    public interface IEnvironmentSettings
    {
        string App_Url { get; set; }
        PostgreSqlSettings Database { get; set; }
    }
}
