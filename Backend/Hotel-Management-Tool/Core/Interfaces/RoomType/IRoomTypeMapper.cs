using Hotel.Management.Tool.Core.Entities;
using Hotel.Management.Tool.Models;
using Hotel.Management.Tool.Models.RoomType;
using System.Collections.Generic;

namespace Hotel.Management.Tool.Core.Interfaces
{
    public interface IRoomTypeMapper
    {
        RoomTypeModel MapRoomTypeToRoomTypeModel(RoomType roomType);
        RoomType MapRoomTypeModelToRoomType(CreateRoomTypeModel roomTypeModel);
        RoomType MapRoomTypeModelToRoomType(CreateRoomTypeModel roomTypeModel, RoomType roomTypeEntity);
        List<RoomTypeModel> MapRoomTypeToRoomTypeModel(List<RoomType> roomTypes);
    }
}
