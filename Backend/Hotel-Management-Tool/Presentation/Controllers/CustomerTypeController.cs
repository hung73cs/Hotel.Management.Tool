using Hotel.Management.Tool.Core.Constants;
using Hotel.Management.Tool.Core.Enums;
using Hotel.Management.Tool.Core.Exceptions;
using Hotel.Management.Tool.Core.Interfaces;
using Hotel.Management.Tool.Models;
using Hotel.Management.Tool.Models.GuestType;
using Hotel.Management.Tool.Presentation.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Hotel.Management.Tool.Presentation.Controllers
{
    [Authorize]
    [Route("Guest-type")]
    public class GuestTypeController : ControllerBase
    {
        private readonly IGuestTypeService _GuestTypeService;
        private readonly IGuestTypeMapper _GuestTypeMapper;

        public GuestTypeController(
            IGuestTypeService GuestTypeService,
            IGuestTypeMapper GuestTypeMapper)
        {
            _GuestTypeService = GuestTypeService;
            _GuestTypeMapper = GuestTypeMapper;
        }

        [HttpGet]
        [Route("id/{GuestTypeId}")]
        [Authorize(Roles = "ADMIN")]
        public async Task<ActionResult<GuestTypeModel>> GetGuestType(Guid GuestTypeId)
        {
            var GuestType = await _GuestTypeService.GetGuestTypeAsync(GuestTypeId);

            if (GuestType == null)
            {
                throw new ExtendException(ErrorCode.NotFound, CommonConstants.ErrorMessage.ItemNotFound);
            }
            return Ok(_GuestTypeMapper.MapGuestTypeToGuestTypeModel(GuestType));
        }

        [HttpPost]
        [Authorize(Roles = "ADMIN")]
        public async Task<ActionResult> CreateGuestType([FromBody] CreateGuestTypeModel GuestTypeModel)
        {
            var mapper = _GuestTypeMapper.MapGuestTypeModelToGuestType(GuestTypeModel);

            if (mapper == null)
            {
                throw new ExtendException(ErrorCode.Conflict, CommonConstants.ErrorMessage.ItemExisted);
            }

            var result = await _GuestTypeService.CreateGuestTypeAsync(mapper);

            Response.AddInfoHeaders(result.Id);

            return NoContent();
        }

        [HttpPut]
        [Route("id/{GuestTypeId}")]
        [Authorize(Roles ="ADMIN")]
        public async Task<ActionResult> UpdateGuestType(Guid GuestTypeId, [FromBody] CreateGuestTypeModel GuestTypeModel)
        {
            var currentGuestType = await _GuestTypeService.GetGuestTypeAsync(GuestTypeId);

            if(currentGuestType == null)
            {
                throw new ExtendException(ErrorCode.NotFound, CommonConstants.ErrorMessage.ItemNotFound);
            }

            var mapper = _GuestTypeMapper.MapGuestTypeModelToGuestType(GuestTypeModel, currentGuestType);

            if(mapper == null)
            {
                throw new ExtendException(ErrorCode.Conflict, CommonConstants.ErrorMessage.WrongMapping);
            }

            await _GuestTypeService.UpdateGuestTypeAsync(mapper);

            return NoContent();
        }

        [HttpDelete]
        [Route("id/{GuestTypeId}")]
        [Authorize(Roles = "ADMIN")]
        public async Task<ActionResult> DeleteGuestType(Guid GuestTypeId)
        {
            await _GuestTypeService.DeleteGuestTypeAsync(GuestTypeId);

            return NoContent();
        }

        [HttpDelete]
        [Route("id/{GuestTypeId}/hard-delete")]
        [Authorize(Roles = "ADMIN")]
        public async Task<ActionResult> HardDeleteGuestType(Guid GuestTypeId)
        {
            await _GuestTypeService.HardDeleteGuestTypeAsync(GuestTypeId);

            return NoContent();
        }

        [HttpGet]
        public async Task<ActionResult<List<GuestTypeModel>>> GetGuestTypes()
        {
            var GuestTypes = await _GuestTypeService.GetGuestTypesAsync();

            if (GuestTypes == null)
            {
                throw new ExtendException(ErrorCode.NotFound, CommonConstants.ErrorMessage.ItemNotFound);
            }
            return Ok(_GuestTypeMapper.MapGuestTypesToGuestTypeModels(GuestTypes));
        }
    }
}
