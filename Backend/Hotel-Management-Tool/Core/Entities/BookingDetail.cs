using System;

namespace Hotel.Management.Tool.Core.Entities
{
    public class BookingDetail : Base
    {
        public string CustomerName { get; set; }
        public Guid CustomerTypeId { get; set; }
        public string IdCard { get; set; }
        public string Address { get; set; }
        public Guid BookingId { get; set; }
        public virtual CustomerType CustomerType { get; set; }
        public virtual Booking Booking { get; set; }
    }
}
