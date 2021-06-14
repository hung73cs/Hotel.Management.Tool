using Hotel.Management.Tool.Core.Constants;
using Hotel.Management.Tool.Core.Entities;
using Hotel.Management.Tool.Core.Enums;
using Hotel.Management.Tool.Core.Exceptions;
using Hotel.Management.Tool.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Hotel.Management.Tool.ApplicationLogic
{
    public class RoomTypeService : IRoomTypeService
    {
        private readonly IRoomTypeRepository _roomType;

        public RoomTypeService(IRoomTypeRepository roomType)
        {
            _roomType = roomType;
        }

        public async Task<RoomType> GetRoomTypeAsync(Guid roomTypeId)
        {
            var roomType = await _roomType.SearchForSingleItemAsync(x => x.Id == roomTypeId);
            return roomType;
        }

        public async Task<List<RoomType>> GetMultipleRoomTypePagingAsync(int pageIndex, int itemPerPage)
        {
            var roomType = await _roomType.GetListByPagingAsync(pageIndex, itemPerPage);
            return roomType;
        }
        public async Task<RoomType> CreateRoomTypeAsync(RoomType roomTypeToCreate)
        {
            var roomType = await _roomType.SearchForSingleItemAsync(x => x.Name == roomTypeToCreate.Name);

            if (roomType != null)
            {
                throw new ExtendException(ErrorCode.Conflict, CommonConstants.ErrorMessage.ItemExisted);
            }

            return await _roomType.CreateAsync(roomTypeToCreate);
        }
        public async Task<RoomType> UpdateRoomTypeAsync(RoomType roomTypeRequest)
        {
            var roomTypes = await _roomType.SearchForMultipleItemsAsync(x => x.Name == roomTypeRequest.Name);

            foreach (var i in roomTypes)
            {
                if (roomTypeRequest.Name == i.Name && roomTypeRequest.Id != i.Id)
                {
                    throw new ExtendException(ErrorCode.Conflict, CommonConstants.ErrorMessage.ItemExisted);
                }
            }

            return await _roomType.UpdateAsync(roomTypeRequest);
        }

        public async Task DeleteRoomTypeAsync(Guid roomTypeId)
        {
            var roomType = await _roomType.SearchForSingleItemAsync(x => x.Id == roomTypeId);

            if (roomType == null)
            {
                throw new ExtendException(ErrorCode.NotFound, CommonConstants.ErrorMessage.ItemNotFound);
            }
            roomType.IsDeleted = true;

            await _roomType.UpdateAsync(roomType);
        }

        public async Task HardDeleteRoomTypeAsync(Guid roomTypeId)
        {
            await _roomType.DeleteAsync(a => a.Id == roomTypeId);
        }

        public async Task<List<RoomType>> GetRoomTypesAsync()
        {
            return await _roomType.GetListAsync();
        }
    }
}
