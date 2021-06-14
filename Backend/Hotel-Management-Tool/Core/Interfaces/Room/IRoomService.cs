using Hotel.Management.Tool.Core.Entities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Hotel.Management.Tool.Core.Interfaces
{
    public interface IRoomService
    {
        Task<Room> GetRoomAsync(Guid id);
        Task<List<Room>> GetMultipleRoomPagingAsync(int pageIndex, int itemPerPage);
        Task<Room> CreateRoomAsync(Room room);
        Task<Room> UpdateRoomAsync(Room room);
        Task DeleteRoomAsync(Guid roomId);
        Task HardDeleteRoomAsync(Guid roomId);        
    }
}
