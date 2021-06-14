using System;

namespace Hotel.Management.Tool.Core.Entities
{
    public class ReportDetail : Base
    {
        public Guid ReportId { get; set; }
        public Guid RomTypeId { get; set; }
        public virtual RoomType RoomType { get; set; }
        public virtual Report Report { get; set; }
        public Decimal Revenue { get; set; }
        public Decimal Ratio { get; set; }
    }
}
