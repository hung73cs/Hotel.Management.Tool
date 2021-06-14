using Hotel.Management.Tool.Core.Interfaces;
using Hotel.Management.Tool.Models.SurchargeRate;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Hotel.Management.Tool.Presentation.Controllers
{
    [Authorize]
    [Route("surcharge-rate")]
    public class SurchargeRateController : ControllerBase
    {
        private readonly ISurchargeRateService _surchargeRateService;
        public SurchargeRateController(ISurchargeRateService surchargeRateService)
        {
            _surchargeRateService = surchargeRateService;
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
