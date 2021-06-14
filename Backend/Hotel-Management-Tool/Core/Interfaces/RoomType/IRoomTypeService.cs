using Hotel.Management.Tool.Core.Entities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Hotel.Management.Tool.Core.Interfaces
{
    public interface IRoomTypeService
    {
        Task<RoomType> GetRoomTypeAsync(Guid id);
        Task<List<RoomType>> GetMultipleRoomTypePagingAsync(int pageIndex, int itemPerPage);
        Task<RoomType> CreateRoomTypeAsync(RoomType roomType);
        Task<RoomType> UpdateRoomTypeAsync(RoomType roomType);
        Task DeleteRoomTypeAsync(Guid roomTypeId);
        Task HardDeleteRoomTypeAsync(Guid roomTypeId);
        Task<List<RoomType>> GetRoomTypesAsync();
    }
}
