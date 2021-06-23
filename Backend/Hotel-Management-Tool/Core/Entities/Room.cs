using Hotel.Management.Tool.Core.Enums;
using System;
using System.Collections.Generic;

namespace Hotel.Management.Tool.Core.Entities
{
    public class Room : Base
    {
        public string Name { get; set; }
        public RoomStatus RoomStatus { get; set; }
        public Guid RoomTypeId { get; set; }
        public string Note { get; set; }
        public virtual RoomType RoomType { get; set; }
        public virtual ICollection<Booking> Bookings { get; set; }
    }
}
