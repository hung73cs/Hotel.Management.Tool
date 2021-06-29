using Hotel.Management.Tool.Core.Constants;
using Hotel.Management.Tool.Core.Enums;
using Hotel.Management.Tool.Core.Exceptions;
using Hotel.Management.Tool.Core.Interfaces;
using Hotel.Management.Tool.Models.Parameter;
using Hotel.Management.Tool.Presentation.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace Hotel.Management.Tool.Presentation.Controllers
{
    [Route("parameter")]
    [ApiController]
    public class ParameterController : ControllerBase
    {
        private readonly IParameterService _parameterService;
        private readonly IParameterMapper _parameterMapper;

        public ParameterController(
            IParameterService parameterService,
            IParameterMapper parameterMapper
            )
        {
            _parameterMapper = parameterMapper;
            _parameterService = parameterService;
        }

        [HttpGet]
        [Route("id/{parameterId}")]

        public async Task<ActionResult<ParameterModel>> GetParameter(Guid parameterId)
        {
            var parameter = await _parameterService.GetParameterAsync(parameterId);
            if (parameter == null)
            {
                throw new ExtendException(ErrorCode.NotFound, CommonConstants.ErrorMessage.ItemNotFound);
            }
            return Ok(_parameterMapper.MapParameterToParameterModel(parameter));
        }

        [HttpGet]
        public async Task<ActionResult<ParameterModel>> GetParameters()
        {
            var parameters = await _parameterService.GetParametersAsync();
            if (parameters == null)
            {
                throw new ExtendException(ErrorCode.NotFound, CommonConstants.ErrorMessage.ItemNotFound);
            }
            return Ok(_parameterMapper.MapParameterToParameterModel(parameters));
        }

        [HttpPost]
        [Authorize(Roles = "ADMIN")]
        public async Task<ActionResult> CreateParameter([FromBody] ParameterModel parameterModel)
        {
            var mapper = _parameterMapper.MapParameterModelToParameter(parameterModel);
            if (mapper == null)
            {
                throw new ExtendException(ErrorCode.Conflict, CommonConstants.ErrorMessage.WrongMapping);
            }
            var result = await _parameterService.CreateParameterAsync(mapper);
            Response.AddInfoHeaders(result.Id);

            return NoContent();
        }

        [HttpPut]
        [Route("id/{parameterId}")]
        [Authorize(Roles = "ADMIN")]
        public async Task<ActionResult> UpdateParameter(Guid parameterId, [FromBody] ParameterModel parameterModel)
        {
            var currentParameter = await _parameterService.GetParameterAsync(parameterId);
            if (currentParameter == null)
            {
                throw new ExtendException(ErrorCode.NotFound, CommonConstants.ErrorMessage.ItemNotFound);
            }
            var mapper = _parameterMapper.MapParameterModelToParameter(parameterModel, currentParameter);
            if (mapper == null)
            {
                throw new ExtendException(ErrorCode.Conflict, CommonConstants.ErrorMessage.WrongMapping);
            }
            await _parameterService.UpdateParameterAsync(mapper);

            return NoContent();
        }

        [HttpDelete]
        [Route("id/{parameterId}")]
        [Authorize(Roles = "ADMIN")]
        public async Task<ActionResult> DeleteParameter(Guid parameterId)
        {
            await _parameterService.DeleteParameterAsync(parameterId);

            return NoContent();
        }
    }
}
