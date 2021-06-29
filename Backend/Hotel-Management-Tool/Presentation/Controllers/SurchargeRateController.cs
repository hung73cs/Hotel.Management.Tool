using Hotel.Management.Tool.Core.Constants;
using Hotel.Management.Tool.Core.Enums;
using Hotel.Management.Tool.Core.Exceptions;
using Hotel.Management.Tool.Core.Interfaces;
using Hotel.Management.Tool.Models.SurchargeRate;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Hotel.Management.Tool.Presentation.Controllers
{
    [Authorize]
    [Route("surcharge-rate")]
    public class SurchargeRateController : ControllerBase
    {
        private readonly ISurchargeRateService _surchargeRateService;
        private readonly ISurchargeRateMapper _surchargeRateMapper;
        public SurchargeRateController(
            ISurchargeRateService surchargeRateService,
            ISurchargeRateMapper surchargeRateMapper)
        {
            _surchargeRateService = surchargeRateService;
            _surchargeRateMapper = surchargeRateMapper;
        }

        [HttpGet]
        [Route("id/{guestLevel}")]
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

        [HttpGet]
        public async Task<ActionResult<List<SurchargeRateModel>>> GetSurchargeRates()
        {
            var surchargeRate = await _surchargeRateService.GetSurchargeRatesAsync();

            if (surchargeRate == null)
            {
                throw new ExtendException(ErrorCode.NotFound, CommonConstants.ErrorMessage.ItemNotFound);
            }

            return Ok(
                _surchargeRateMapper.MapSurchargeRateToSurchargeRateModel(surchargeRate));
        }

        [HttpPost]
        [Authorize(Roles = "ADMIN")]
        public async Task<ActionResult> CreateSurchargeRate([FromBody] SurchargeRateModel surchargeRateModel)
        {
            var mapper = _surchargeRateMapper.MapSurchargeRateModelToSurchargeRate(surchargeRateModel);
            if (mapper == null)
            {
                throw new ExtendException(ErrorCode.Conflict, CommonConstants.ErrorMessage.WrongMapping);
            }

            await _surchargeRateService.CreateSurchargeRateAsync(mapper);

            return NoContent();
        }

        [HttpPut]
        [Route("id/{guestLevel}")]
        [Authorize(Roles = "ADMIN")]
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
        [Route("id/{guestLevel}")]
        [Authorize(Roles = "ADMIN")]
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
    }
}
