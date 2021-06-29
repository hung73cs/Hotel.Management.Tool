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
    [Route("booking")]
    public class BookingController : ControllerBase
    {
        private readonly IBookingService _bookingService;
        private readonly IBookingMapper _bookingMapper;
        private readonly IRoomService _roomService;

        public BookingController(
            IBookingService bookingService,
            IBookingMapper bookingMapper,
            IRoomService roomService)
        {
            _bookingService = bookingService;
            _bookingMapper = bookingMapper;
            _roomService = roomService;

        }

        [HttpPost]
        public async Task<ActionResult> CreateBooking([FromBody] CreateBookingModel model)
        {
            var mapper = _bookingMapper.MapBookingModelToBooking(model);

            if (mapper == null)
            {
                throw new ExtendException(ErrorCode.Conflict, CommonConstants.ErrorMessage.WrongMapping);
            }
            var room = await _roomService.GetRoomAsync(model.RoomId);
            if(room.RoomStatus == RoomStatus.CLOSE)
            {
                throw new ExtendException(ErrorCode.Conflict, "Phòng đã được thuê");

            }
            var result = await _bookingService.CreateAsync(mapper);
            await _roomService.BookRoom(model.RoomId);

            Response.AddInfoHeaders(result.Id);

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
            var room = await _roomService.GetRoomAsync(bookingModel.RoomId);
      
            if (bookingModel.RoomId != bookingEntity.RoomId)
            {
                if (room.RoomStatus == RoomStatus.CLOSE)
                {
                    throw new ExtendException(ErrorCode.Conflict, "Phòng đã được thuê");

                }
            }

            if (bookingModel.RoomId != bookingEntity.RoomId)
                await _roomService.UpdateBookRoom(bookingEntity.RoomId, bookingModel.RoomId);

            var mapper = _bookingMapper.MapBookingModelToBooking(bookingEntity, bookingModel);
            if (mapper == null)
            {
                throw new ExtendException(ErrorCode.Conflict, CommonConstants.ErrorMessage.WrongMapping);
            }
   
            await _bookingService.DeleteBookingDetail(bookingId);
            await _bookingService.UpdateBooking(mapper);

            

            return NoContent();
        }

        [HttpDelete]
        [Route("id/{bookingId}")]
        public async Task<ActionResult> DeleteBooking(Guid bookingId)
        {
            var booking = await _bookingService.GetBooking(bookingId);

            await _roomService.UnBookRoom(booking.RoomId);
            await _bookingService.DeleteBooking(bookingId);

            return NoContent();
        }

        [HttpDelete]
        [Route("id/{bookingId}/hard-delete")]
        public async Task<ActionResult> HardDeleteBooking(Guid bookingId)
        {
            var booking = await _bookingService.GetBooking(bookingId);

            await _roomService.UnBookRoom(booking.RoomId);
            await _bookingService.HardDeleteBooking(bookingId);

            return NoContent();
        }

        [HttpGet]
        public async Task<ActionResult<List<BookingModel>>> GetBookingsAsync()
        {
            var bookings = await _bookingService.GetBookings();

            if (bookings == null)
            {
                throw new ExtendException(ErrorCode.NotFound, CommonConstants.ErrorMessage.ItemNotFound);
            }
            return Ok(
                 _bookingMapper.MappBookingToBookingModel(bookings));
        }
    }
}
