using Hotel.Management.Tool.Core.Entities;
using Hotel.Management.Tool.Models.Booking;
using System;
using System.Collections.Generic;
using System.Linq;
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
    }
}
