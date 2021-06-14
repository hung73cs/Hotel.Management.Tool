using Hotel.Management.Tool.Core.Entities;
using Hotel.Management.Tool.Core.Interfaces;

namespace Hotel.Management.Tool.Core.Database
{
    public class BookingRepository : BaseCrudRepository<AppDbContext, Booking>, IBookingRepository
    {
        public BookingRepository(AppDbContext context) : base(context)
        { }
    }
}
