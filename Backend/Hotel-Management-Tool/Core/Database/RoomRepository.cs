using Hotel.Management.Tool.Core.Entities;
using Hotel.Management.Tool.Core.Interfaces;

namespace Hotel.Management.Tool.Core.Database
{
    public class RoomRepository : BaseCrudRepository<AppDbContext, Room>, IRoomRepository
    {
        public RoomRepository(AppDbContext context) : base(context)
        { }
    }
}
