using System;

namespace Hotel.Management.Tool.Models
{
    public class BookingDetailModel
    {
        public string CustomerName { get; set; }
        public Guid CustomerTypeId { get; set; }
        public string IdCard { get; set; }
        public string Address { get; set; }
        public Guid BookingId { get; set; }
    }
}
