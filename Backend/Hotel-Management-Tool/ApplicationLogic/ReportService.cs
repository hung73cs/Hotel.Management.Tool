using Hotel.Management.Tool.Core.Constants;
using Hotel.Management.Tool.Core.Entities;
using Hotel.Management.Tool.Core.Enums;
using Hotel.Management.Tool.Core.Exceptions;
using Hotel.Management.Tool.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Hotel.Management.Tool.ApplicationLogic
{
    public class ReportService : IReportService
    {
        private readonly IReportRepository _report;

        public ReportService(IReportRepository report)
        {
            _report = report;
        }
        public async Task<Report> CreateReportAsync(Report reportToCreate)
        {
            return await _report.CreateAsync(reportToCreate);
        }

        public async Task DeleteReportAsync(Guid reportId)
        {
            var report = await _report.SearchForSingleItemAsync(x => x.Id == reportId);

            if (report == null)
            {
                throw new ExtendException(ErrorCode.NotFound, CommonConstants.ErrorMessage.ItemNotFound);
            }
            report.IsDeleted = true;

            await _report.UpdateAsync(report);
        }

        public async Task<Report> GetReportAsync(Guid reportId)
        {
            var report = await _report.SearchForSingleItemAsync(x => x.Id == reportId);

            if (report == null)
            {
                throw new ExtendException(ErrorCode.NotFound, CommonConstants.ErrorMessage.ItemNotFound);
            }
            return report;
        }

        public async Task<List<Report>> GetReportsAsync()
        {
            var reports = await _report.GetListAsync();
            var results = new List<Report>();
            foreach (var i in reports)
            {
                var report = await _report.SearchForSingleItemAsync(x => x.Id == i.Id, x => x.ReportDetails);
                if (report != null)
                    results.Add(report);
            }
            return results;
        }

        public async Task<Report> UpdateReportAsync(Report report)
        {
            return await _report.UpdateAsync(report);
        }
    }
}
