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
    public class RoomService : IRoomService
    {
        private readonly IRoomRepository _room;

        public RoomService(IRoomRepository room)
        {
            _room = room;
        }

        public async Task<Room> GetRoomAsync(Guid roomId)
        {
            var room = await _room.SearchForSingleItemAsync(x => x.Id == roomId, x => x.RoomType);

            if (room == null)
            {
                throw new ExtendException(ErrorCode.NotFound, CommonConstants.ErrorMessage.ItemNotFound);
            }
            return room;
        }
        public async Task<List<Room>> GetMultipleRoomPagingAsync(int pageIndex, int itemPerPage)
        {
            var room = await _room.GetListByPagingAsync(pageIndex, itemPerPage);
            return room;
        }

        public async Task<Room> CreateRoomAsync(Room roomToCreate)
        {
            var room = await _room.SearchForSingleItemAsync(x => x.Name == roomToCreate.Name);

            if (room != null)
            {
                throw new ExtendException(ErrorCode.Conflict, CommonConstants.ErrorMessage.ItemExisted);
            }

            return await _room.CreateAsync(roomToCreate);

        }

        public async Task<Room> UpdateRoomAsync(Room roomRequest)
        {
            var rooms = await _room.SearchForMultipleItemsAsync(x => x.Name == roomRequest.Name);

            foreach (var i in rooms)
            {
                if (roomRequest.Name == i.Name && roomRequest.Id != i.Id)
                {
                    throw new ExtendException(ErrorCode.Conflict, CommonConstants.ErrorMessage.ItemExisted);
                }
            }
            return await _room.UpdateAsync(roomRequest);
        }

        public async Task DeleteRoomAsync(Guid roomId)
        {
            var room = await _room.SearchForSingleItemAsync(x => x.Id == roomId);

            if (room == null)
            {
                throw new ExtendException(ErrorCode.NotFound, CommonConstants.ErrorMessage.ItemNotFound);
            }
            room.IsDeleted = true;

            await _room.UpdateAsync(room);
        }

        public async Task HardDeleteRoomAsync(Guid roomId)
        {
            await _room.DeleteAsync(a => a.Id == roomId);
        }

        public async Task<List<Room>> GetRoomsAsync()
        {
            var rooms =  await _room.GetListAsync();
            var results = new List<Room>();
            foreach (var i in rooms)
            {
                var room = await _room.SearchForSingleItemAsync(x => x.Id == i.Id, x => x.RoomType);
                results.Add(room);
            }
            return results;
        }
    }
}
