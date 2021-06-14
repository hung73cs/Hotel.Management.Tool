using Hotel.Management.Tool.Core.Constants;
using Hotel.Management.Tool.Core.Enums;
using Hotel.Management.Tool.Core.Exceptions;
using Hotel.Management.Tool.Core.Interfaces;
using Hotel.Management.Tool.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace Hotel.Management.Tool.Presentation.Controllers
{
    [Authorize]
    [Route("room-type")]
    public class RoomTypeController : ControllerBase
    {
        private readonly IRoomTypeService _roomTypeService;
        private readonly IRoomTypeMapper _roomTypeMapper;

        public RoomTypeController(
            IRoomTypeService roomTypeService,
            IRoomTypeMapper roomTypeMapper)
        {
            _roomTypeService = roomTypeService;
            _roomTypeMapper = roomTypeMapper;
        }

        [HttpGet]               
        [Route("id/{roomTypeId}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult<RoomTypeModel>> GetRoomType(Guid roomTypeId)
        {
            var roomType = await _roomTypeService.GetRoomTypeAsync(roomTypeId);

            if (roomType == null)
            {
                throw new ExtendException(ErrorCode.NotFound, CommonConstants.ErrorMessage.ItemNotFound);
            }
            return Ok(_roomTypeMapper.MapRoomTypeToRoomTypeModel(roomType));
        }

        [HttpPost]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> CreateRoomType([FromBody] RoomTypeModel roomTypeModel)
        {
            var mapper = _roomTypeMapper.MapRoomTypeModelToRoomType(roomTypeModel);

            if (mapper == null)
            {
                throw new ExtendException(ErrorCode.Conflict, CommonConstants.ErrorMessage.ItemExisted);
            }

            await _roomTypeService.CreateRoomTypeAsync(mapper);

            return NoContent();
        }

        [HttpPut]
        [Route("id/{roomTypeId}")]
        [Authorize(Roles ="Admin")]
        public async Task<ActionResult> UpdateRoomType(Guid roomTypeId, [FromBody]RoomTypeModel roomTypeModel)
        {
            var currentRoomType = await _roomTypeService.GetRoomTypeAsync(roomTypeId);

            if(currentRoomType == null)
            {
                throw new ExtendException(ErrorCode.NotFound, CommonConstants.ErrorMessage.ItemNotFound);
            }

            var mapper = _roomTypeMapper.MapRoomTypeModelToRoomType(roomTypeModel, currentRoomType);

            if(mapper == null)
            {
                throw new ExtendException(ErrorCode.Conflict, CommonConstants.ErrorMessage.WrongMapping);
            }

            await _roomTypeService.UpdateRoomTypeAsync(mapper);

            return NoContent();
        }

        [HttpDelete]
        [Route("id/{roomTypeId}")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> DeleteRoomType(Guid roomTypeId)
        {
            await _roomTypeService.DeleteRoomTypeAsync(roomTypeId);

            return NoContent();
        }

        [HttpDelete]
        [Route("id/{roomTypeId}/hard-delete")]
        [Authorize(Roles = "Admin")]
        public async Task<ActionResult> HardDeleteRoomType(Guid roomTypeId)
        {
            await _roomTypeService.HardDeleteRoomTypeAsync(roomTypeId);

            return NoContent();
        }
    }
}
