using Hotel.Management.Tool.Core.Entities;
using Hotel.Management.Tool.Models;
using Hotel.Management.Tool.Models.Booking;

namespace Hotel.Management.Tool.Core.Interfaces
{
    public interface IBookingMapper
    {
        Booking MapBookingModelToBooking(CreateBookingModel model);
        Booking MapBookingModelToBooking(Booking bookingEntity, CreateBookingModel model);
        BookingModel MappBookingToBookingModel(Booking booking);
    }
}
