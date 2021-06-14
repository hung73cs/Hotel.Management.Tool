using System;
using System.Collections.Generic;

namespace Hotel.Management.Tool.Core.Entities
{
    public class Booking : Base
    {
        public DateTime StartedDate { get; set; }
        public Guid RoomId { get; set; }
        public Guid AccountId { get; set; }
        public int NumberOfGuest { get; set; }
        public decimal UnitPrice { get; set; }
        public decimal UnitStandardPrice { get; set; }
        public virtual Room Room { get; set; }
        public virtual Account Account { get; set; }
        public virtual BillDetail BillDetail { get; set; }
        public virtual ICollection<BookingDetail> BookingDetails { get; set; }

    }
}
