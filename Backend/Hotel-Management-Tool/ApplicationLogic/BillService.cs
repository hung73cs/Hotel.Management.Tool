using Hotel.Management.Tool.Core.Entities;
using Hotel.Management.Tool.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Hotel.Management.Tool.ApplicationLogic
{
    public class BillService : IBillService
    {
        public Task<Bill> CreateAsync(Bill accountRequest)
        {
            throw new NotImplementedException();
        }

        public Task DeleteBill(Guid id)
        {
            throw new NotImplementedException();
        }

        public Task<Bill> GetBill(Guid bookingId)
        {
            throw new NotImplementedException();
        }

        public Task<List<Bill>> GetBills()
        {
            throw new NotImplementedException();
        }

        public Task HardDeleteBill(Guid id)
        {
            throw new NotImplementedException();
        }

        public Task<Bill> UpdateBill(Bill bookingToUpdate)
        {
            throw new NotImplementedException();
        }
    }
}
