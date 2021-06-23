using System;
using System.Collections.Generic;

namespace Hotel.Management.Tool.Models.Booking
{
    public class BookingModel
    {
        public Guid Id { get; set; }
        public Guid RoomId { get; set; }
        public Guid AccountId { get; set; }
        public int NumberOfGuest { get; set; }
        public DateTime StartedDate { get; set; }
        public decimal UnitPrice { get; set; }
        public decimal UnitStandardPrice { get; set; }
        public List<BookingDetailModel> BookingDetailModels { get; set; }
        public BookingModel()
        {
            BookingDetailModels = new List<BookingDetailModel>();
        }
    }
}
