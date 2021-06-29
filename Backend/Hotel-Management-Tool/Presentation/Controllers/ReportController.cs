using Hotel.Management.Tool.Core.Constants;
using Hotel.Management.Tool.Core.Entities;
using Hotel.Management.Tool.Core.Enums;
using Hotel.Management.Tool.Core.Exceptions;
using Hotel.Management.Tool.Core.Interfaces;
using Hotel.Management.Tool.Models.Report;
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
        private readonly IReportMapper _reportMapper;
        private readonly IReportService _reportService;
        private readonly IBillService _billService;
        private readonly IBookingService _bookingService;
        private readonly IRoomTypeService _roomTypeService;
        private readonly IRoomService _roomService;

        public ReportController(
            IReportMapper reportMapper,
            IReportService reportService,
            IBillService billService,
            IBookingService bookingService,
            IRoomTypeService roomTypeService,
            IRoomService roomService
)
        {
            _reportMapper = reportMapper;
            _reportService = reportService;
            _billService = billService;
            _bookingService = bookingService;
            _roomTypeService = roomTypeService;
            _roomService = roomService;
        }

        [HttpGet]
        [Route("id/{reportId}")]
        [Authorize(Roles = "ADMIN")]
        public async Task<ActionResult> GetReport(Guid reportId)
        {
            var report = await _reportService.GetReportAsync(reportId);
            return Ok(_reportMapper.MapReportToReportModel(report));
        }

        [HttpGet]
        [Authorize(Roles = "ADMIN")]
        public async Task<ActionResult<List<ReportModel>>> GetBookingsAsync()
        {
            var reports = await _reportService.GetReportsAsync();

            if (reports == null)
            {
                throw new ExtendException(ErrorCode.NotFound, CommonConstants.ErrorMessage.ItemNotFound);
            }
            return Ok(
                 _reportMapper.MapReportToReportModel(reports));
        }

        [HttpDelete]
        [Route("id/{reportId}")]
        public async Task<ActionResult> DeleteReport(Guid reportId)
        {
            await _reportService.DeleteReportAsync(reportId);

            return NoContent();
        }

        [HttpPost]
        [Route("month")]
        [Authorize(Roles = "ADMIN")]
        public async Task<ActionResult> CreateReportByMonth([FromBody] ReportCreateModel reportToCreate)
        {
            var bills = await _billService.GetBills();
            var exactBills = new List<Bill>();
            decimal totalPrice = 0;
            foreach (var i in bills)
            {
                if (i.CreatedDate.Month == reportToCreate.Month && i.CreatedDate.Year == reportToCreate.Year)
                {
                    exactBills.Add(i);
                    totalPrice += i.TotalPrice;
                }
            }
            var maper = _reportMapper.MapReportModelToReport(reportToCreate, totalPrice);
            await _reportService.CreateReportAsync(maper);
            return Ok(new
            {
                TotalPrice = totalPrice
            });
        }

        [HttpPost]
        [Route("year")]
        public async Task<ActionResult> CreateReportByYear([FromBody] ReportCreateModel reportToCreate)
        {
            var bills = await _billService.GetBills();
            var exactBills = new List<Bill>();
            decimal totalPrice = 0;
            foreach (var i in bills)
            {
                if (i.CreatedDate.Year == reportToCreate.Year)
                {
                    exactBills.Add(i);
                    totalPrice += i.TotalPrice;
                }
            }
            var maper = _reportMapper.MapReportModelToReport(reportToCreate, totalPrice);
            await _reportService.CreateReportAsync(maper);
            return Ok(new
            {
                TotalPrice = totalPrice
            });
        }
    }
}
