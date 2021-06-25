using Hotel.Management.Tool.Core.Constants;
using Hotel.Management.Tool.Core.Entities;
using Hotel.Management.Tool.Core.Enums;
using Hotel.Management.Tool.Core.Exceptions;
using Hotel.Management.Tool.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Hotel.Management.Tool.ApplicationLogic
{
    public class BillService : IBillService
    {
        private readonly IBillRepository _bill;
        public BillService(IBillRepository bill)
        {
            _bill = bill;
        }

        public async Task<Bill> CreateAsync(Bill bill)
        {
            return await _bill.CreateAsync(bill);

        }

        public async Task DeleteBill(Guid id)
        {
            var bill = await _bill.SearchForSingleItemAsync(x => x.Id == id);

            if (bill == null)
            {
                throw new ExtendException(ErrorCode.NotFound, CommonConstants.ErrorMessage.ItemNotFound);
            }
            bill.IsDeleted = true;

            await _bill.UpdateAsync(bill);
        }

        public async Task<Bill> GetBill(Guid billId)
        {
            var bill = await _bill.SearchForSingleItemAsync(x => x.Id == billId, x => x.BillDetails);

            if (bill == null)
            {
                throw new ExtendException(ErrorCode.NotFound, CommonConstants.ErrorMessage.ItemNotFound);
            }
            return bill;
        }

        public async Task<List<Bill>> GetBills()
        {
            var bills = await _bill.GetListAsync();
            var results = new List<Bill>();
            foreach (var i in bills)
            {
                var bill = await _bill.SearchForSingleItemAsync(x => x.Id == i.Id, x => x.BillDetails);
                if (bill != null)
                    results.Add(bill);
            }
            return results;
        }

        public async Task HardDeleteBill(Guid id)
        {
            await _bill.DeleteAsync(x => x.Id == id);
        }

        public async Task<Bill> UpdateBill(Bill bill)
        {
            return await _bill.UpdateAsync(bill);
        }
    }
}
