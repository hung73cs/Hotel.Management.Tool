using System;

namespace Hotel.Management.Tool.Models.Bill
{
    public class BillDetailModel
    {
        public Guid BookingId { get; set; }
        public int NumberOfRentalDays { get; set; }
        public decimal UnitPrice { get; set; }
        public decimal Price { get; set; }
    }
}
