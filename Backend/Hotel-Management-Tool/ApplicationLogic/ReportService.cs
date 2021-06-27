using Hotel.Management.Tool.Core.Constants;
using Hotel.Management.Tool.Core.Entities;
using Hotel.Management.Tool.Core.Enums;
using Hotel.Management.Tool.Core.Exceptions;
using Hotel.Management.Tool.Core.Interfaces;
using System;
using System.Collections.Generic;
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

        public async Task<Report> CreateAsync(Report reportRequest)
        {
            return await _report.CreateAsync(reportRequest);
        }

        public async Task<Report> GetReport(Guid reportId)
        {
            var report = await _report.SearchForSingleItemAsync(x => x.Id == reportId, x => x.ReportDetails);
            if (report == null)
            {
                throw new ExtendException(ErrorCode.NotFound, CommonConstants.ErrorMessage.ItemNotFound);
            }
            return report;
        }

        public async Task<Report> UpdateReport(Report reportToUpdate)
        {
            return await _report.UpdateAsync(reportToUpdate);
        }
        public async Task DeleteReport(Guid id)
        {
            var report = await _report.SearchForSingleItemAsync(x => x.Id == id);
            if (report == null)
            {
                throw new ExtendException(ErrorCode.NotFound, CommonConstants.ErrorMessage.ItemNotFound);
            }
            report.IsDeleted = true;
            await _report.UpdateAsync(report);
        }



        public async Task<List<Report>> GetReports()
        {
            var reports = await _report.GetListAsync();
            var results = new List<Report>();
            foreach (var i in reports)
            {
                var report = await _report.SearchForSingleItemAsync(x => x.Id == i.Id, x => x.ReportDetails);
                results.Add(report);
            }
            return results;
        }

        public async Task HardDeleteReport(Guid id)
        {
            await _report.DeleteAsync(x => x.Id == id);
        }

    }
}
