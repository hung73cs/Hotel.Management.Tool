using Hotel.Management.Tool.Core.Entities;
using Hotel.Management.Tool.Core.Interfaces;

namespace Hotel.Management.Tool.Core.Database
{
    public class BookingDetailRepository : BaseCrudRepository<AppDbContext, BookingDetail>, IBookingDetailRepository
    {
        public BookingDetailRepository(AppDbContext context) : base(context)
        { }
    }
}
