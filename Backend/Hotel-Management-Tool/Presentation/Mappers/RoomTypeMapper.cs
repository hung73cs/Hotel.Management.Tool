using Hotel.Management.Tool.Core.Entities;
using Hotel.Management.Tool.Core.Interfaces;
using Hotel.Management.Tool.Models;
using Hotel.Management.Tool.Models.RoomType;
using System.Collections.Generic;

namespace Hotel.Management.Tool.Presentation.Mappers
{
    public class RoomTypeMapper : IRoomTypeMapper
    {
        private readonly IRoomTypeRepository _roomTypeRepository;

        public RoomTypeMapper(IRoomTypeRepository roomTypeRepository)
        {
            _roomTypeRepository = roomTypeRepository;
        }

        public RoomTypeModel MapRoomTypeToRoomTypeModel(RoomType roomType)
        {
            var roomTypeModel = new RoomTypeModel
            {
                Id = roomType.Id,
                Name = roomType.Name,
                Cost = roomType.Cost
            };

            return roomTypeModel;
        }

        public RoomType MapRoomTypeModelToRoomType(CreateRoomTypeModel roomTypeModel)
        {
            var roomType = new RoomType
            {
                Name = roomTypeModel.Name,
                Cost = roomTypeModel.Cost
            };

            return roomType;
        }

        public RoomType MapRoomTypeModelToRoomType(CreateRoomTypeModel roomTypeModel, RoomType roomType)
        {

            roomType.Name = roomTypeModel.Name;
            roomType.Cost = roomTypeModel.Cost;

            return roomType;
        }

        public List<RoomTypeModel> MapRoomTypeToRoomTypeModel(List<RoomType> roomTypes)
        {
            var roomTypeModels = new List<RoomTypeModel>();
            foreach (var i in roomTypes)
            {
                var roomTypeModel = new RoomTypeModel
                {
                    Id = i.Id,
                    Name = i.Name,
                    Cost = i.Cost
                };
                roomTypeModels.Add(roomTypeModel);
            }
            return roomTypeModels;
        }
    }
}
