using Hotel.Management.Tool.Core.Constants;
using Hotel.Management.Tool.Core.Enums;
using Hotel.Management.Tool.Core.Exceptions;
using Hotel.Management.Tool.Core.Interfaces;
using Hotel.Management.Tool.Models.SurchargeRate;
using Hotel.Management.Tool.Presentation.Extensions;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace Hotel.Management.Tool.Presentation.Controllers
{
    [ApiController]
    [Route("surcharge-rate")]
    public class SurchargeRateController : ControllerBase
    {
        private readonly ISurchargeRateService _surchargeRateService;
        private readonly ISurchargeRateMapper _surchargeRateMapper;
        public SurchargeRateController(ISurchargeRateService surchargeRateService, ISurchargeRateMapper surchargeRateMapper)
        {
            _surchargeRateService = surchargeRateService;
            _surchargeRateMapper = surchargeRateMapper;
        }

        [HttpGet]
        [Route("id/{surchargeRateId}")]
        public async Task<ActionResult<SurchargeRateModel>> GetSurchargeRate(int guestLevel)
        {
            var surchargeRate = await _surchargeRateService.GetSurchargeRateAsync(guestLevel);

            if (surchargeRate == null)
            {
                throw new ExtendException(ErrorCode.NotFound, CommonConstants.ErrorMessage.ItemNotFound);
            }

            return Ok(
                _surchargeRateMapper.MapSurchargeRateToSurchargeRateModel(surchargeRate));
        }

        [HttpPost]
        public async Task<ActionResult> CreateSurchargeRate([FromBody] SurchargeRateModel surchargeRateModel)
        {
            var mapper = _surchargeRateMapper.MapSurchargeRateModelToSurchargeRate(surchargeRateModel);
            if (mapper == null)
            {
                throw new ExtendException(ErrorCode.Conflict, CommonConstants.ErrorMessage.WrongMapping);
            }
            var result = await _surchargeRateService.CreateSurchargeRateAsync(mapper);

            return NoContent();
        }

        [HttpPut]
        [Route("id/{surchargeRateId}")]
        public async Task<ActionResult> UpdateSurchargeRate(int guestLevel, [FromBody] SurchargeRateModel surchargeRateModel)
        {
            var currentSurchargeRate = await _surchargeRateService.GetSurchargeRateAsync(guestLevel);

            if (currentSurchargeRate == null)
            {
                throw new ExtendException(ErrorCode.NotFound, CommonConstants.ErrorMessage.ItemNotFound);
            }
            var mapper = _surchargeRateMapper.MapSurchargeRateModelToSurchargeRate(surchargeRateModel, currentSurchargeRate);

            if (mapper == null)
            {
                throw new ExtendException(ErrorCode.Conflict, CommonConstants.ErrorMessage.WrongMapping);
            }
            await _surchargeRateService.UpdateSurchargeRateAsync(mapper);

            return NoContent();
        }

        [HttpDelete]
        [Route("id/{surchargeRateId}")]
        public async Task<ActionResult> DeleteSurchargeRate(int guestLevel)
        {
            await _surchargeRateService.DeleteSurchargeRateAsync(guestLevel);

            return NoContent();
        }

        [HttpPost]
        [Route("calculate")]
        public async Task<ActionResult> Calculate([FromBody] CalculateCostSurchargeRateModel model)
        {
            var result = await _surchargeRateService.CalculateSurchargeRate(model.UnitPrice, model.NumberOfGuest);
            return Ok(
                new
                {
                    Result = result
                });
        }

        [HttpGet]
        public async Task<ActionResult<List<SurchargeRateModel>>> GetSurchargeRates()
        {
            var surchargeRates = await _surchargeRateService.GetSurchargeRatesAsync();
            if (surchargeRates == null)
            {
                throw new ExtendException(ErrorCode.NotFound, CommonConstants.ErrorMessage.ItemNotFound);
            }
            return Ok(_surchargeRateMapper.MapSurchargeRateToSurchargeRateModel(surchargeRates));
        }
    }
}
