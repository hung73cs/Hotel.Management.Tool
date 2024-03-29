﻿using Hotel.Management.Tool.Core.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Hotel.Management.Tool.Core.Interfaces
{
    public interface ISurchargeRateService
    {
        Task<SurchargeRate> GetSurchargeRateAsync(int guestLevel);
        Task<SurchargeRate> CreateSurchargeRateAsync(SurchargeRate surcharge);
        Task<SurchargeRate> UpdateSurchargeRateAsync(SurchargeRate surcharge);
        Task DeleteSurchargeRateAsync(int guestLevel);
        Task<List<SurchargeRate>> GetSurchargeRatesAsync();
        Task<decimal> CalculateSurchargeRate(decimal unitPrice, int numberOfGuest);

    }
}
