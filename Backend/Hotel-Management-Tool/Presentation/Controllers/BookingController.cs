using Hotel.Management.Tool.Core.Constants;
using Hotel.Management.Tool.Core.Enums;
using Hotel.Management.Tool.Core.Exceptions;
using Hotel.Management.Tool.Core.Interfaces;
using Hotel.Management.Tool.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace Hotel.Management.Tool.Presentation.Controllers
{
    [Authorize]
    [Route("booking")]
    public class BookingController : ControllerBase
    {
        private readonly IBookingService _bookingService;
        private readonly IBookingMapper _bookingMapper;

        public BookingController(
            IBookingService bookingService,
            IBookingMapper bookingMapper)
        {
            _bookingService = bookingService;
            _bookingMapper = bookingMapper;

        }

        [HttpPost]
        public async Task<ActionResult> CreateBooking([FromBody] CreateBookingModel model)
        {       
            var mapper = _bookingMapper.MapBookingModelToBooking(model);

            if (mapper == null)
            {
                throw new ExtendException(ErrorCode.Conflict, CommonConstants.ErrorMessage.WrongMapping);
            }

            await _bookingService.CreateAsync(mapper);
            return NoContent();
        }

        [HttpGet]
        [Route("id/{bookingId}")]
        public async Task<ActionResult> GetBooking(Guid bookingId)
        {
            var booking = await _bookingService.GetBooking(bookingId);
            return Ok(_bookingMapper.MappBookingToBookingModel(booking));
        }

        [HttpPut]
        [Route("id/{bookingId}")]
        public async Task<ActionResult> UpdateBooking(Guid bookingId, [FromBody] CreateBookingModel bookingModel)
        {
            var bookingEntity = await _bookingService.GetBooking(bookingId);
            var mapper = _bookingMapper.MapBookingModelToBooking(bookingEntity, bookingModel);
            if (mapper == null)
            {
                throw new ExtendException(ErrorCode.Conflict, CommonConstants.ErrorMessage.WrongMapping);
            }
            await _bookingService.UpdateBooking(mapper);
            return NoContent();
        }

        [HttpDelete]
        [Route("id/{bookingId}")]
        public async Task<ActionResult> DeleteCustomerType(Guid customerTypeId)
        {
            await _bookingService.DeleteBooking(customerTypeId);

            return NoContent();
        }

        [HttpDelete]
        [Route("id/{bookingId}/hard-delete")]
        public async Task<ActionResult> HardDeleteCustomerType(Guid customerTypeId)
        {
            await _bookingService.HardDeleteBooking(customerTypeId);

            return NoContent();
        }
    }
}
