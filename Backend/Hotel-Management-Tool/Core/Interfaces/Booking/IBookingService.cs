using Hotel.Management.Tool.Core.Entities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Hotel.Management.Tool.Core.Interfaces
{
    public interface IBookingService
    {
        Task<Booking> CreateAsync(Booking accountRequest);
        Task<Booking> GetBooking(Guid bookingId);
        Task<Booking> UpdateBooking(Booking bookingToUpdate);
        Task DeleteBooking(Guid id);
        Task HardDeleteBooking(Guid id);
        Task<List<Booking>> GetBookings();
    }
}
