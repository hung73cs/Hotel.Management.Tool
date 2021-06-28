using Hotel.Management.Tool.Core.Entities;
using Hotel.Management.Tool.Models.Report;
using System.Collections.Generic;

namespace Hotel.Management.Tool.Core.Interfaces
{
    public interface IReportMapper
    {
        ReportModel MapReportToReportModel(Report report);
        List<ReportModel> MapReportToReportModel(List<Report> reports);
        Report MapReportModelToReport(ReportCreateModel reportModel, decimal totalRevenue);
        Report MapReportModelToReport(ReportCreateModel reportModel, Report reportEntity);
    }
}
