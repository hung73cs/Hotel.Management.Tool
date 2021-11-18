using NetEscapades.Configuration.Validation;
using System.ComponentModel.DataAnnotations;

namespace Hotel.Management.Tool.Core.Configuration
{
    public class PostgreSqlSettings : IValidatable
    {
        [Required]
        public string Host { get; set; }

        [Required]
        public string Port { get; set; }

        [Required]
        public string Name { get; set; }

        public string UserName { get; set; }

        public string Password { get; set; }

        public int MaxPoolSize { get; set; }

        public int MinPoolSize { get; set; }

        public string ConnectionString =>
            $"Host={Host};Port={Port};Database={Name};Username={UserName};Password={Password}";

        //public bool LoggingEnabled { get; set; } = false;

        public void Validate()
        {
            Validator.ValidateObject(this, new ValidationContext(this), true);
        }
    }
}
