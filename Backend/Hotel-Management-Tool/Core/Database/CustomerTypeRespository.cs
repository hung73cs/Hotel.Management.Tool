using Hotel.Management.Tool.Core.Entities;
using Hotel.Management.Tool.Core.Interfaces;

namespace Hotel.Management.Tool.Core.Database
{
    public class GuestTypeRepository : BaseCrudRepository<AppDbContext, GuestType>, IGuestTypeRepository
    {
        public GuestTypeRepository(AppDbContext context) : base(context)
        { }
    }
}
