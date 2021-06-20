using Hotel.Management.Tool.Core.Entities;
using Hotel.Management.Tool.Core.Enums;
using Hotel.Management.Tool.Core.Interfaces;
using Hotel.Management.Tool.Models;
using Hotel.Management.Tool.Models.Room;
using System;
using System.Collections.Generic;

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
                RoomStatus = RoomStatus.OPEN,
                Note = roomModel.Note,
                //RoomTypeId = Guid.TryParse(roomModel.roomTypeId, out var RoomTypeId) ? RoomTypeId : Guid.Empty,
                RoomTypeId = roomModel.roomTypeId
            };

            return room;
        }

        public Room MapRoomModelToRoom(CreateRoomModel roomModel, Room roomEntity)
        {
            if (roomModel != null)
            {
                roomEntity.Name = roomModel.Name;
                roomEntity.Note = roomModel.Note;
                roomEntity.RoomStatus = RoomStatus.OPEN;
                //roomEntity.RoomTypeId = Guid.TryParse(roomModel.roomTypeId, out var RoomTypeId) ? RoomTypeId : Guid.Empty;
                roomEntity.RoomTypeId = roomModel.roomTypeId;
            }
            return roomEntity;
        }

        public RoomModel MapRoomToRoomModel(Room room)
        {
            var roomModel = new RoomModel
            {
                Id = room.Id,
                Name = room.Name,
                RoomStatus = room.RoomStatus.ToString(),
                Note = room.Note,
                roomTypeId = room.RoomTypeId
            };
            if(room.RoomType != null)
            {
                var roomTypeModel = new RoomTypeModel
                {
                    Id = room.RoomTypeId,
                    Name = room.RoomType.Name,
                    Cost = room.RoomType.Cost,
                };
                roomModel.RoomTypeModel = roomTypeModel;
            }
            return roomModel;
        }

        public List<RoomModel> MapRoomToRoomModel(List<Room> rooms)
        {
            var roomModels = new List<RoomModel>();
            foreach(var i in rooms)
            {
                var roomModel = new RoomModel
                {
                    Id = i.Id,
                    Name = i.Name,
                    RoomStatus = i.RoomStatus.ToString(),
                    Note = i.Note,
                    roomTypeId = i.RoomTypeId
                };
                if (i.RoomType != null)
                {
                    var roomTypeModel = new RoomTypeModel
                    {
                        Id = i.RoomTypeId,
                        Name = i.RoomType.Name,
                        Cost = i.RoomType.Cost,
                    };
                    roomModel.RoomTypeModel = roomTypeModel;
                }
                roomModels.Add(roomModel);
            }
            return roomModels;
        }
    }
}
