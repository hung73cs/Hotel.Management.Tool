using System.Collections.Generic;

namespace Hotel.Management.Tool.Core.Entities
{
    public class RoomType : Base
    {
        public string Name { get; set; }
        public float Cost { get; set; }
        public virtual ICollection<Room> Rooms { get; set; }
        public virtual ReportDetail ReportDetail { get; set; }

    }
}
