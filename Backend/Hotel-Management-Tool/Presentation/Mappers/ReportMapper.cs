using Hotel.Management.Tool.Core.Entities;
using Hotel.Management.Tool.Core.Interfaces;
using Hotel.Management.Tool.Models.Report;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Hotel.Management.Tool.Presentation.Mappers
{
    public class ReportMapper : IReportMapper
    {
        public Report MapReportModelToReport(ReportModel reportModel)
        {
            throw new NotImplementedException();
        }

        public Report MapReportModelToReport(ReportModel reportModel, Report reportEntity)
        {
            throw new NotImplementedException();
        }

        public ReportModel MapReportToReportModel(Report report)
        {
            var reportDetailModels = new List<ReportDetailModel>();
            if (report.ReportDetails != null)
            {
                reportDetailModels = report.ReportDetails.Select(x => new ReportDetailModel
                {
                    ReportId = x.ReportId,
                    RomTypeId = x.RomTypeId,
                    Revenue = x.Revenue,
                    Ratio = x.Ratio
                }).ToList();
            }
            return new ReportModel
            {
                Id = report.Id,
                Month = report.Month,
                Year = report.Year,
                TotalRevenue = report.TotalRevenue,
                ReportDetailModels = reportDetailModels,
            };
        }

        public List<ReportModel> MapReportToReportModel(List<Report> reports)
        {
            var reportModels = new List<ReportModel>();
            foreach (var i in reports)
            {
                var reportDetailModels = new List<ReportDetailModel>();
                if (i.ReportDetails != null)
                {
                    reportDetailModels = i.ReportDetails.Select(x => new ReportDetailModel
                    {
                        ReportId = x.ReportId,
                        RomTypeId = x.RomTypeId,
                        Revenue = x.Revenue,
                        Ratio = x.Ratio
                    }).ToList();
                }
                var reportModel = new ReportModel()
                {
                    Id = i.Id,
                    Month = i.Month,
                    Year = i.Year,
                    TotalRevenue = i.TotalRevenue,
                    ReportDetailModels = reportDetailModels,
                };
                reportModels.Add(reportModel);
            }
            return reportModels;
        }
    }
}
