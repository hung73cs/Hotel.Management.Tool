using Hotel.Management.Tool.Core.Entities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Hotel.Management.Tool.Core.Interfaces
{
    public interface ICustomerTypeService
    {
        Task<CustomerType> GetCustomerTypeAsync(Guid id);
        Task<List<CustomerType>> GetMultipleCustomerTypePagingAsync(int pageIndex, int itemPerPage);
        Task<CustomerType> CreateCustomerTypeAsync(CustomerType customerType);
        Task<CustomerType> UpdateCustomerTypeAsync(CustomerType customerType);
        Task DeleteCustomerTypeAsync(Guid customerTypeId);
        Task HardDeleteCustomerTypeAsync(Guid customerTypeId);
    }
}
