using Hotel.Management.Tool.Core.Entities;
using Hotel.Management.Tool.Models.Report;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Hotel.Management.Tool.Core.Interfaces
{
    public interface IReportService
    {
        Task<Report> CreateAsync(Report accountRequest);
        Task<Report> GetReport(Guid reportId);
        Task<Report> UpdateReport(Report reportToUpdate);
        Task DeleteReport(Guid id);
        Task HardDeleteReport(Guid id);
        Task<List<Report>> GetReports();
    }
}
