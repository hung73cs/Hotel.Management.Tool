using Hotel.Management.Tool.Core.Entities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Hotel.Management.Tool.Core.Interfaces
{
    public interface IReportService
    {
        Task<Report> GetReportAsync(Guid id);
        Task<List<Report>> GetReportsAsync();
        Task<Report> CreateReportAsync(Report report);
        Task<Report> UpdateReportAsync(Report report);
        Task DeleteReportAsync(Guid report);
    }
}
