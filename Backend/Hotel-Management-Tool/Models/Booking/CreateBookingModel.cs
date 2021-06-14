using Hotel.Management.Tool.Core.Entities;
using System;
using System.Collections.Generic;

namespace Hotel.Management.Tool.Models
{
    public class CreateBookingModel
    {
        public Guid RoomId { get; set; }
        public Guid AccountId { get; set; }
        public int NumberOfGuest { get; set; }
        public DateTime StartedDate { get; set; }
        public decimal UnitPrice { get; set; }
        public decimal UnitStandardPrice { get; set; }
        public List<BookingDetail> BookingDetails {get;set;}
        public CreateBookingModel()
        {
            BookingDetails = new List<BookingDetail>();
        }
    }
}
