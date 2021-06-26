using System;

namespace Hotel.Management.Tool.Models.Room
{
    public class RoomModel
    {
        public RoomModel()
        {
            RoomTypeModel = new RoomTypeModel();
        }
        public Guid Id { get; set; }
        public string Name { get; set; }
        public Guid roomTypeId { get; set; }
        public string RoomStatus { get; set; }
        public string Note { get; set; }
        public RoomTypeModel RoomTypeModel { get; set; }
    }
}
