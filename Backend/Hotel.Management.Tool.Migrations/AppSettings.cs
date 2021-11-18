using Hotel.Management.Tool.Core.Configuration;
using System.ComponentModel.DataAnnotations;

namespace Hotel.Management.Tool.Migrations
{
    public class AppSettings
    {
        public PostgreSqlSettings Database { get; set; }

        public void Validate()
        {
            Validator.ValidateObject(this, new ValidationContext(this), true);

            Database.Validate();
        }
    }
}
