using System;

namespace Hotel.Management.Tool.Models
{
    public class CustomerTypeModel
    {
        public Guid Id { get; set; } 
        public string Name { get; set; }
        public decimal SurchargeRate { get; set; }
    }
}
