using Hotel.Management.Tool.Core.Constants;
using Hotel.Management.Tool.Core.Entities;
using Hotel.Management.Tool.Core.Enums;
using Hotel.Management.Tool.Core.Exceptions;
using Hotel.Management.Tool.Core.Interfaces;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Hotel.Management.Tool.ApplicationLogic
{
    public class SurchargeRateService : ISurchargeRateService
    {
        private readonly ISurchargeRateRepository _surchargeRate;

        public SurchargeRateService(ISurchargeRateRepository surchargeRate)
        {
            _surchargeRate = surchargeRate;
        }


        public async Task<SurchargeRate> CreateSurchargeRateAsync(SurchargeRate surchargeRateToCreate)
        {
            var surchargeRate = await _surchargeRate.SearchForSingleItemAsync(x => x.GuestLevel == surchargeRateToCreate.GuestLevel);

            if (surchargeRate != null)
            {
                throw new ExtendException(ErrorCode.Conflict, CommonConstants.ErrorMessage.ItemExisted);
            }

            return await _surchargeRate.CreateAsync(surchargeRateToCreate);
        }

        public async Task DeleteSurchargeRateAsync(int guestLevel)
        {
            var surchargeRate = await _surchargeRate.SearchForSingleItemAsync(x => x.GuestLevel == guestLevel);

            if (surchargeRate == null)
            {
                throw new ExtendException(ErrorCode.NotFound, CommonConstants.ErrorMessage.ItemNotFound);
            }
            surchargeRate.IsDeleted = true;

            await _surchargeRate.UpdateAsync(surchargeRate);
        }

        public async Task<SurchargeRate> GetSurchargeRateAsync(int guestLevel)
        {
            var surchargeRate = await _surchargeRate.SearchForSingleItemAsync(x => x.GuestLevel == guestLevel);
            return surchargeRate;
        }

        public async Task<List<SurchargeRate>> GetSurchargeRatesAsync()
        {
            return await _surchargeRate.GetListAsync();
        }

        public async Task<SurchargeRate> UpdateSurchargeRateAsync(SurchargeRate surchargeRateToUpdate)
        {
            var surchargeRates = await _surchargeRate.SearchForMultipleItemsAsync(x => x.GuestLevel == surchargeRateToUpdate.GuestLevel);

            return await _surchargeRate.UpdateAsync(surchargeRateToUpdate);
        }

        public async Task<decimal> CalculateSurchargeRate(decimal unitPrice, int numberOfGuest)
        {
            decimal cost = 0;

            var surchargeRates = await _surchargeRate.GetListAsync();

            surchargeRates.OrderBy(o => o.GuestLevel).ToList();

            foreach (var i in surchargeRates)
            {
                if (i.GuestLevel <= numberOfGuest)
                {
                    cost += (unitPrice * i.Rate) / 100;
                }
            }

            return cost;

        }
    }
}
