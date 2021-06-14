using System.Collections.Generic;

namespace Hotel.Management.Tool.Core.Entities
{
    public class Report : Base
    {
        public int Month { get; set; }
        public int Year { get; set; }
        public decimal TotalRevenue { get; set; }
        public ICollection<ReportDetail> ReportDetails { get; set; }
    }
}
