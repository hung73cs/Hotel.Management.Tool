using Hotel.Management.Tool.Core.Entities;
using Hotel.Management.Tool.Core.Interfaces;
using Hotel.Management.Tool.Models;

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
                Name = roomType.Name,
                Cost = roomType.Cost
            };

            return roomTypeModel;
        }

        public RoomType MapRoomTypeModelToRoomType(RoomTypeModel roomTypeModel)
        {
            var roomType = new RoomType
            {
                Name = roomTypeModel.Name,
                Cost = roomTypeModel.Cost
            };

            return roomType;
        }

        public RoomType MapRoomTypeModelToRoomType(RoomTypeModel roomTypeModel, RoomType roomType)
        {

            roomType.Name = roomTypeModel.Name;
            roomType.Cost = roomTypeModel.Cost;

            return roomType;
        }
    }
}
