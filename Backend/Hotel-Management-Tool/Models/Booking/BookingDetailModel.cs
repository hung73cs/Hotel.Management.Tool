using System;

namespace Hotel.Management.Tool.Models
{
    public class BookingDetailModel
    {
        public string GuestName { get; set; }
        public Guid GuestTypeId { get; set; }
        public string IdCard { get; set; }
        public string Address { get; set; }
        public Guid BookingId { get; set; }
    }
}
