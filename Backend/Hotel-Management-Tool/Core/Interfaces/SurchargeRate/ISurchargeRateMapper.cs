using Hotel.Management.Tool.Core.Entities;
using Hotel.Management.Tool.Models.SurchargeRate;
using System.Collections.Generic;

namespace Hotel.Management.Tool.Core.Interfaces
{
    public interface ISurchargeRateMapper
    {
        SurchargeRateModel MapSurchargeRateToSurchargeRateModel(SurchargeRate surchargeRate);
        List<SurchargeRateModel> MapSurchargeRateToSurchargeRateModel(List<SurchargeRate> surchargeRates);
        SurchargeRate MapSurchargeRateModelToSurchargeRate(SurchargeRateModel surchargeRateModel);
        SurchargeRate MapSurchargeRateModelToSurchargeRate(SurchargeRateModel surchargeRateModel, SurchargeRate surchargeRateEntity);

    }
}
