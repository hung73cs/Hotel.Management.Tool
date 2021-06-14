using Hotel.Management.Tool.Core.Entities;
using Hotel.Management.Tool.Models.Room;

namespace Hotel.Management.Tool.Core.Interfaces
{
    public interface IRoomMapper
    {
        RoomModel MapRoomToRoomModel(Room room);
        Room MapRoomModelToRoom(CreateRoomModel room);
        Room MapRoomModelToRoom(CreateRoomModel room, Room roomEntity);
    }
}
