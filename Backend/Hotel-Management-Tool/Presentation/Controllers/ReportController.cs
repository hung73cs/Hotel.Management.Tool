using Hotel.Management.Tool.Core.Constants;
using Hotel.Management.Tool.Core.Enums;
using Hotel.Management.Tool.Core.Exceptions;
using Hotel.Management.Tool.Core.Interfaces;
using Hotel.Management.Tool.Models;
using Hotel.Management.Tool.Models.Booking;
using Hotel.Management.Tool.Presentation.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Hotel.Management.Tool.Presentation.Controllers
{
    [Authorize]
    [Route("report")]
    public class ReportController : ControllerBase
    {
        private readonly IReportService _reportService;
        private readonly IReportMapper _reportMapper;

        public ReportController(
            IReportService reportServive,
            IReportMapper reportMapper)
        {
            _reportService = reportServive;
            _reportMapper = reportMapper;
        }

        [HttpPost]
        public async Task<ActionResult> CreateReport([FromBody] CreateReportModel model)
        {
            var mapper = _reportMapper.MapReportModelToReport(model);
            if (mapper == null)
            {
                throw new ExtendException(ErrorCode.Conflict, CommonConstants.ErrorMessage.WrongMapping);
            }
            var result = await _reportService.CreateAsync(mapper);

            Response.AddInfoHeaders(result.Id);

            return NoContent();
        }

        [HttpGet]
        [Route("id/{reportId}")]
        public async Task<ActionResult> GetReport(Guid reportId)
        {
            var report = await _reportService.GetReport(reportId);
            return Ok(_reportMapper.MappReportToReportModel(report));
        }

        [HttpPut]
        [Route("id/{reportId}")]
        public async Task<ActionResult> UpdateReport(Guid reportId, [FromBody] CreateReportModel reportModel)
        {
            var bookingEntity = await _reportService.GetReport(reportId);
            var mapper = _reportMapper.MapReportModelToReport(bookingEntity, reportModel);
            if (mapper == null)
            {
                throw new ExtendException(ErrorCode.Conflict, CommonConstants.ErrorMessage.WrongMapping);
            }
            await _reportService.UpdateReport(mapper);
            return NoContent();
        }

        [HttpDelete]
        [Route("id/{reportId}")]
        public async Task<ActionResult> DeleteReport(Guid ReportId)
        {
            await _reportService.DeleteReport(ReportId);

            return NoContent();
        }

        /*[HttpDelete]
        [Route("id/{reportId}/hard-delete")]
        public async Task<ActionResult> HardDeleteGuestType(Guid GuestTypeId)
        {
            await _reportService.HardDeleteBooking(GuestTypeId);

            return NoContent();
        }*/
        [HttpGet]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<List<BookingModel>>> GetReportsAsync()
        {
            var reports = await _reportService.GetReports();

            if (reports == null)
            {
                throw new ExtendException(ErrorCode.NotFound, CommonConstants.ErrorMessage.ItemNotFound);
            }
            return Ok(_reportMapper.MappReportToReportModel(reports));
        }
    }
}
