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
    public class BookingService : IBookingService
    {
        private readonly IBookingRepository _booking;
        public BookingService(IBookingRepository booking)
        {
            _booking = booking;
        }
        public async Task<Booking> CreateAsync(Booking bookingRequest)
        {

            return await _booking.CreateAsync(bookingRequest);
        }



        public async Task<Booking> GetBooking(Guid bookingId)
        {
            var booking = await _booking.SearchForSingleItemAsync(x => x.Id == bookingId, x => x.BookingDetails);

            if (booking == null)
            {
                throw new ExtendException(ErrorCode.NotFound, CommonConstants.ErrorMessage.ItemNotFound);
            }
            return booking;
        }



        public async Task<Booking> UpdateBooking(Booking bookingToUpdate)
        {
            return await _booking.UpdateAsync(bookingToUpdate);
        }

        public async Task DeleteBooking(Guid id)
        {
            var booking = await _booking.SearchForSingleItemAsync(x => x.Id == id);

            if (booking == null)
            {
                throw new ExtendException(ErrorCode.NotFound, CommonConstants.ErrorMessage.ItemNotFound);
            }
            booking.IsDeleted = true;

            await _booking.UpdateAsync(booking);
        }

        public async Task HardDeleteBooking(Guid id)
        {
            await _booking.DeleteAsync(x => x.Id == id);
        }

        public async Task<List<Booking>> GetBookings()
        {
            var bookings = await _booking.GetListAsync();
            var results = new List<Booking>();
            foreach (var i in bookings)
            {
                var booking = await _booking.SearchForSingleItemAsync(x => x.Id == i.Id, x => x.BookingDetails);
                if (booking != null)
                    results.Add(booking);
            }
            return results;
        }
    }
}