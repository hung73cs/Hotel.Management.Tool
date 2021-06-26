using Hotel.Management.Tool.Core.Entities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Hotel.Management.Tool.Core.Interfaces
{
    public interface IBillService
    {
        Task<Bill> CreateAsync(Bill accountRequest);
        Task<Bill> GetBill(Guid bookingId);
        Task<Bill> UpdateBill(Bill bookingToUpdate);
        Task DeleteBill(Guid id);
        Task HardDeleteBill(Guid id);
        Task<List<Bill>> GetBills();
    }
}
