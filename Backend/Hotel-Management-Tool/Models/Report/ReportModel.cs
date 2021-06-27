using Hotel.Management.Tool.Core.Entities;
using System;
using System.Collections.Generic;

namespace Hotel.Management.Tool.Models.Report
{
    public class ReportModel
    {
        public Guid Id { get; set; }
        public int Month { get; set; }
        public int Year { get; set; }
        public decimal TotalRevenue { get; set; }
        public List<ReportDetail> ReportDetails { get; set; }
        public ReportModel()
        {
            ReportDetails = new List<ReportDetail>();
        }
    }
}
