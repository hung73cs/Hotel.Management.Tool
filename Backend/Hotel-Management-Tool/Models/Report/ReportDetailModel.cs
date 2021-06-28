using System;

namespace Hotel.Management.Tool.Models.Report
{
    public class ReportDetailModel
    {
        public Guid ReportId { get; set; }
        public Guid RomTypeId { get; set; }
        public Decimal Revenue { get; set; }
        public Decimal Ratio { get; set; }
    }
}
