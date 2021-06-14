using System;

namespace Hotel.Management.Tool.Models.Room
{
    public class CreateRoomModel
    {
        public string Name { get; set; }
        public Guid roomTypeId { get; set; }
        public string RoomStatus { get; set; }
        public string Note { get; set; }
    }
}
