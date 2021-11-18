using Hotel.Management.Tool.Core.Interfaces;
using NetEscapades.Configuration.Validation;
using System.ComponentModel.DataAnnotations;

namespace Hotel.Management.Tool.Core.Configuration
{
    public class EnvironmentSettings : IValidatable, IEnvironmentSettings
    {
        [Required]
        public string App_Url { get; set; }

        [Required]
        public PostgreSqlSettings Database { get; set; }

        public bool LogResponseRequestData { get; set; }

        public void Validate()
        {
            Validator.ValidateObject(this, new ValidationContext(this), true);
            Database.Validate();
        }
    }
}
