using Hotel.Management.Tool.Core.Entities;
using Hotel.Management.Tool.Models;

namespace Hotel.Management.Tool.Core.Interfaces
{
    public interface IRoomTypeMapper
    {
        RoomTypeModel MapRoomTypeToRoomTypeModel(RoomType roomType);
        RoomType MapRoomTypeModelToRoomType(RoomTypeModel roomTypeModel);
        RoomType MapRoomTypeModelToRoomType(RoomTypeModel roomTypeModel, RoomType roomTypeEntity);
    }
}
