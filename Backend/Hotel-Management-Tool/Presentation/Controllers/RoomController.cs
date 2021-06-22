using Hotel.Management.Tool.Core.Constants;
using Hotel.Management.Tool.Core.Enums;
using Hotel.Management.Tool.Core.Exceptions;
using Hotel.Management.Tool.Core.Interfaces;
using Hotel.Management.Tool.Models.Room;
using Hotel.Management.Tool.Presentation.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Hotel.Management.Tool.Presentation.Controllers
{
    [Route("room")]
    [ApiController]
    public class RoomController : ControllerBase
    {
        private readonly IRoomService _room;
        private readonly IRoomMapper _roomMapper;

        public RoomController(
            IRoomService room,
            IRoomMapper roomMapper)
        {
            _room = room;
            _roomMapper = roomMapper;
        }

        [HttpGet]
        [Route("id/{roomId}")]
        [Authorize(Roles = "ADMIN")]
        public async Task<ActionResult<RoomModel>> GetRoom(Guid roomId)
        {
            var room = await _room.GetRoomAsync(roomId);

            if (room == null)
            {
                throw new ExtendException(ErrorCode.NotFound, CommonConstants.ErrorMessage.ItemNotFound);
            }
            return Ok(_roomMapper.MapRoomToRoomModel(room));
        }

        [HttpPost]
        [Authorize(Roles = "ADMIN")]
        public async Task<ActionResult> CreateRoom([FromBody] CreateRoomModel room)
        {
            var mapper = _roomMapper.MapRoomModelToRoom(room);

            if (mapper == null)
            {
                throw new ExtendException(ErrorCode.Conflict, CommonConstants.ErrorMessage.ItemExisted);
            }

            var result = await _room.CreateRoomAsync(mapper);

            Response.AddInfoHeaders(result.Id);

            return NoContent();
        }

        [HttpPut]
        [Route("id/{roomId}")]
        [Authorize(Roles = "ADMIN")]
        public async Task<ActionResult> UpdateRoom(Guid roomId, [FromBody] CreateRoomModel roomModel)
        {
            var currentRoom = await _room.GetRoomAsync(roomId);

            if (currentRoom == null)
            {
                throw new ExtendException(ErrorCode.NotFound, CommonConstants.ErrorMessage.ItemNotFound);
            }

            var mappedAccount = _roomMapper.MapRoomModelToRoom(roomModel, currentRoom);

            if (mappedAccount == null)
            {
                throw new ExtendException(ErrorCode.Conflict, CommonConstants.ErrorMessage.WrongMapping);
            }

            await _room.UpdateRoomAsync(mappedAccount);

            return NoContent();
        }

        [HttpDelete]
        [Route("id/{roomId}")]
        [Authorize(Roles = "ADMIN")]
        public async Task<ActionResult> DeleteRoom(Guid roomId)
        {
            await _room.DeleteRoomAsync(roomId);

            return NoContent();
        }

        [HttpDelete]
        [Route("id/{roomId}/hard-delete")]
        [Authorize(Roles = "ADMIN")]
        public async Task<ActionResult> HardDeleteRoom(Guid roomId)
        {
            await _room.HardDeleteRoomAsync(roomId);

            return NoContent();
        }

        [HttpGet]
        public async Task<ActionResult<List<RoomModel>>> GetRooms()
        {
            var room = await _room.GetRoomsAsync();

            if (room == null)
            {
                throw new ExtendException(ErrorCode.NotFound, CommonConstants.ErrorMessage.ItemNotFound);
            }
            return Ok(_roomMapper.MapRoomToRoomModel(room));
        }
    }
}
