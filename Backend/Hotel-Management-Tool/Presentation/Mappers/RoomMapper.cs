using Hotel.Management.Tool.Core.Entities;
using Hotel.Management.Tool.Core.Enums;
using Hotel.Management.Tool.Core.Interfaces;
using Hotel.Management.Tool.Models;
using Hotel.Management.Tool.Models.Room;
using System;

namespace Hotel.Management.Tool.Presentation.Mappers
{
    public class RoomMapper : IRoomMapper
    {
        private readonly IEnumMapper _enumMapper;

        public RoomMapper(IEnumMapper enumMapper)
        {
            _enumMapper = enumMapper;
        }
        public Room MapRoomModelToRoom(CreateRoomModel roomModel)
        {
            var room = new Room
            {
                Name = roomModel.Name,
                RoomStatus = _enumMapper.Map<RoomStatus>(roomModel.RoomStatus).Value,
                Note = roomModel.Note,
                RoomTypeId = Guid.TryParse(roomModel.roomTypeId, out var RoomTypeId) ? RoomTypeId : Guid.Empty,
            };

            return room;
        }

        public Room MapRoomModelToRoom(CreateRoomModel roomModel, Room roomEntity)
        {
            if (roomModel != null)
            {
                roomEntity.Name = roomModel.Name;
                roomEntity.Note = roomModel.Note;
                roomEntity.RoomStatus = _enumMapper.Map<RoomStatus>(roomModel.RoomStatus).Value;
                roomEntity.RoomTypeId = Guid.TryParse(roomModel.roomTypeId, out var RoomTypeId) ? RoomTypeId : Guid.Empty;
            }
            return roomEntity;
        }

        public RoomModel MapRoomToRoomModel(Room room)
        {
            var roomModel = new RoomModel
            {
                Name = room.Name,
                RoomStatus = room.RoomStatus.ToString(),
                Note = room.Note
            };
            var roomTypeModel = new RoomTypeModel
            {
                Name = room.RoomType.Name,
                Cost = room.RoomType.Cost
            };

            roomModel.RoomTypeModel = roomTypeModel;

            return roomModel;
        }
    }
}
