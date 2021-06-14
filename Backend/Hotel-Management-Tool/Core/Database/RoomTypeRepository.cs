using Hotel.Management.Tool.Core.Entities;
using Hotel.Management.Tool.Core.Interfaces;

namespace Hotel.Management.Tool.Core.Database
{
    public class RoomTypeRepository : BaseCrudRepository<AppDbContext, RoomType>, IRoomTypeRepository
    {
        public RoomTypeRepository(AppDbContext context) : base(context)
        { }
    }
}
