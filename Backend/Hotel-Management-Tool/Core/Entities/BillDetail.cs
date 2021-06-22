using System;

namespace Hotel.Management.Tool.Core.Entities
{
    public class BillDetail : Base
    {
        public Guid BookingId { get; set; }
        public Guid BillId { get; set; }
        public int NumberOfRentalDays { get; set; }
        public decimal UnitPrice { get; set; }
        public decimal Price { get; set; }
        public virtual Booking Booking { get; set; }
        public virtual Bill Bill { get; set; }

    }
}
