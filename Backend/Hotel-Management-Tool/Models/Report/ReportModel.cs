﻿using System;

namespace Hotel.Management.Tool.Models.Report
{
    public class ReportModel
    {
        public Guid Id { get; set; }
        public int Month { get; set; }
        public int Year { get; set; }
        public decimal TotalRevenue { get; set; }
    }
}
