using System;

namespace Hotel.Management.Tool.Core.Entities
{
    public class BookingDetail : Base
    {
        public string GuestName { get; set; }
        public Guid GuestTypeId { get; set; }
        public string IdCard { get; set; }
        public string Address { get; set; }
        public Guid BookingId { get; set; }
        public virtual GuestType GuestType { get; set; }
        public virtual Booking Booking { get; set; }
    }
}
