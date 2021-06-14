using System.Collections.Generic;

namespace Hotel.Management.Tool.Core.Entities
{
    public class GuestType : Base
    {
        public string Name { get; set; }
        public decimal SurchargeRate { get; set; }
        public virtual ICollection<BookingDetail> BookingDetails { get; set; }

    }
}
