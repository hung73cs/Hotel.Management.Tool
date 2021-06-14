using System;
using System.Collections.Generic;

namespace Hotel.Management.Tool.Core.Entities
{
    public class Bill : Base
    {
        public DateTime CreatedDate { get; set; }
        public string CustomerName { get; set; }
        public string Address { get; set; }
        public decimal TotalPrice { get; set; }
        public virtual ICollection<BillDetail> BillDetails { get; set; }
    }
}
