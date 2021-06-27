using Hotel.Management.Tool.Core.Entities;
using Hotel.Management.Tool.Core.Interfaces;
using Hotel.Management.Tool.Models.SurchargeRate;
using System;
using System.Collections.Generic;

namespace Hotel.Management.Tool.Presentation.Mappers
{
    public class SurchargeRateMapper : ISurchargeRateMapper
    {
        public SurchargeRateModel MapSurchargeRateToSurchargeRateModel(SurchargeRate surchargeRate)
        {
            var surchargeRateModel = new SurchargeRateModel
            {
                GuestLevel = surchargeRate.GuestLevel,
                Rate = surchargeRate.Rate,
            };
            return surchargeRateModel;
        }
        public SurchargeRate MapSurchargeRateModelToSurchargeRate(SurchargeRateModel surchargeRateModel)
        {
            var surchargeRate = new SurchargeRate
            {
                GuestLevel = surchargeRateModel.GuestLevel,
                Rate = surchargeRateModel.Rate,
            };
            return surchargeRate;
        }

        public SurchargeRate MapSurchargeRateModelToSurchargeRate(SurchargeRateModel surchargeRateModel, SurchargeRate surchargeRateEntity)
        {
            surchargeRateEntity.GuestLevel = surchargeRateModel.GuestLevel;
            surchargeRateEntity.Rate = surchargeRateModel.Rate;

            return surchargeRateEntity;
        }

        public List<SurchargeRateModel> MapSurchargeRateToSurchargeRateModel(List<SurchargeRate> surchargeRates)
        {
            var surchargeRateModels = new List<SurchargeRateModel>();
            foreach (var i in surchargeRates)
            {
                var surchargeRateModel = new SurchargeRateModel
                {
                    GuestLevel = i.GuestLevel,
                    Rate = i.Rate
                };
                surchargeRateModels.Add(surchargeRateModel);
            }
            return surchargeRateModels;
        }
    }
}