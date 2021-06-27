using System;
using System.Collections.Generic;
using System.Linq;
using Hotel.Management.Tool.Core.Entities;
using Hotel.Management.Tool.Core.Interfaces;
using Hotel.Management.Tool.Models;
using Hotel.Management.Tool.Models.Report;

namespace Hotel.Management.Tool.Presentation.Mappers
{
    public class ReportMapper : IReportMapper
    {
        public Report MapReportModelToReport(CreateReportModel model)
        {
            var reportDetails = new List<ReportDetail>();
            if (model.ReportDetails != null)
            {
                reportDetails = model.ReportDetails.Select(x => new ReportDetail
                {
                    RomTypeId = x.RomTypeId,
                    Revenue = x.Revenue,
                    Ratio = x.Ratio
                }).ToList();
            }
            return new Report
            {
                Id = Guid.NewGuid(),
                Month = model.Month,
                Year = model.Year,
                TotalRevenue = model.TotalRevenue,
                ReportDetails = reportDetails,
            };
        }


        public ReportModel MappReportToReportModel(Report report)
        {
            var reportDetails = new List<ReportDetail>();
            if (report.ReportDetails != null)
            {
                reportDetails = report.ReportDetails.Select(x => new ReportDetail
                {
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
                ReportDetails = reportDetails,
            };
        }

        public List<ReportModel> MappReportToReportModel(List<Report> reports)
        {
            var reportModels = new List<ReportModel>();
            foreach (var i in reports)
            {
                var reportDetails = new List<ReportDetail>();
                if (i.ReportDetails != null)
                {
                    reportDetails = i.ReportDetails.Select(x => new ReportDetail
                    {
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
                    ReportDetails = reportDetails,
                };
                reportModels.Add(reportModel);
            }
            return reportModels;
        }

        public Report MapReportModelToReport(Report reportEntity, CreateReportModel model)
        {
            var reportDetails = new List<ReportDetail>();
            if (model.ReportDetails != null)
            {
                reportDetails = model.ReportDetails.Select(x => new ReportDetail
                {
                    RomTypeId = x.RomTypeId,
                    Revenue = x.Revenue,
                    Ratio = x.Ratio
                }).ToList();
            }
            if (model != null)
            {
                reportEntity.Month = model.Month;
                reportEntity.Year = model.Year;
                reportEntity.TotalRevenue = model.TotalRevenue;
                reportEntity.ReportDetails = reportDetails;
            }
            return reportEntity;
        }

    }
}