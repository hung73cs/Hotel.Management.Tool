using Hotel.Management.Tool.Core.Constants;
using Hotel.Management.Tool.Core.Enums;
using Hotel.Management.Tool.Core.Exceptions;
using Hotel.Management.Tool.Core.Interfaces;
using Hotel.Management.Tool.Models.Bill;
using Hotel.Management.Tool.Presentation.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Hotel.Management.Tool.Presentation.Controllers
{
    [Authorize]
    [Route("bill")]
    public class BillController : ControllerBase
    {
        private readonly IBillService _bill;
        private readonly IBillMapper _billMapper;
        private readonly IRoomService _roomService;
        private readonly IBookingService _bookingService;

        public BillController(
            IBillService bill,
            IBillMapper billMapper,
            IRoomService roomService,
            IBookingService bookingService)
        {
            _bill = bill;
            _billMapper = billMapper;
            _roomService = roomService;
            _bookingService = bookingService;
        }

        [HttpGet]
        [Route("id/{billId}")]
        public async Task<ActionResult<BillModel>> GetBill(Guid billId)
        {
            var bill = await _bill.GetBill(billId);

            if (bill == null)
            {
                throw new ExtendException(ErrorCode.NotFound, CommonConstants.ErrorMessage.ItemNotFound);
            }

            return Ok(
                _billMapper.MapBillToBillModel(bill));
        }

        [HttpGet]
        public async Task<ActionResult<List<BillModel>>> GetBills()
        {
            var bills = await _bill.GetBills();

            if (bills == null)
            {
                throw new ExtendException(ErrorCode.NotFound, CommonConstants.ErrorMessage.ItemNotFound);
            }
            return Ok(
                 _billMapper.MapBillToBillModel(bills));
        }

        [HttpPost]
        public async Task<ActionResult> CreateBill([FromBody] CreateBillModel bill)
        {
            var mapper = _billMapper.MapBillModelToBill(bill);

            foreach (var i in bill.BillDetailModels)
            {
                var booking = await _bookingService.GetBooking(i.BookingId);

                if (booking != null)
                {
                    await _roomService.UnBookRoom(booking.RoomId);
                    await _bookingService.DeleteBooking(booking.Id);
                }
            }

            if (mapper == null)
            {
                throw new ExtendException(ErrorCode.Conflict, CommonConstants.ErrorMessage.WrongMapping);
            }

            var result = await _bill.CreateAsync(mapper);

            Response.AddInfoHeaders(result.Id);

            return NoContent();
        }

        [HttpPut]
        [Route("id/{billId}")]
        public async Task<ActionResult> UpdateBill(Guid billId, [FromBody] CreateBillModel updateBill)
        {
            var curBill = await _bill.GetBill(billId);

            if (curBill == null)
            {
                throw new ExtendException(ErrorCode.NotFound, CommonConstants.ErrorMessage.ItemNotFound);
            }

            var mapper = _billMapper.MapBillModelToBill(curBill, updateBill);

            if (mapper == null)
            {
                throw new ExtendException(ErrorCode.Conflict, CommonConstants.ErrorMessage.WrongMapping);
            }
            await _bill.UpdateBill(mapper);

            return NoContent();
        }

        [HttpDelete]
        [Route("id/{billId}")]
        [Authorize(Roles = "ADMIN")]
        public async Task<ActionResult> DeleteBill(Guid billId)
        {
            await _bill.DeleteBill(billId);

            return NoContent();
        }

        [HttpDelete]
        [Route("id/{billId}/hard-delete")]
        [Authorize(Roles = "ADMIN")]
        public async Task<ActionResult> HardDeleteBill(Guid billId)
        {
            await _bill.HardDeleteBill(billId);

            return NoContent();
        }
    }
}
