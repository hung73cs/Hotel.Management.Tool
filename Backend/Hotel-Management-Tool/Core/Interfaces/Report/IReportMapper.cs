using Hotel.Management.Tool.Core.Entities;
using Hotel.Management.Tool.Models;
using Hotel.Management.Tool.Models.Report;
using System.Collections.Generic;

namespace Hotel.Management.Tool.Core.Interfaces
{
    public interface IReportMapper
    {
        Report MapReportModelToReport(CreateReportModel model);
        Report MapReportModelToReport(Report reportEntity, CreateReportModel model);
        ReportModel MappReportToReportModel(Report report);
        List<ReportModel> MappReportToReportModel(List<Report> reports);
    }
}
