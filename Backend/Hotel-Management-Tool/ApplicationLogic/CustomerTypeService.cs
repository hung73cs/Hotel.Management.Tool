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
    public class CustomerTypeService : ICustomerTypeService
    {
        private readonly ICustomerTypeRepository _customerType;

        public CustomerTypeService(ICustomerTypeRepository customerType)
        {
            _customerType = customerType;
        }

        public async Task<CustomerType> GetCustomerTypeAsync(Guid customerTypeId)
        {
            var customerType = await _customerType.SearchForSingleItemAsync(x => x.Id == customerTypeId);
            return customerType;
        }

        public async Task<List<CustomerType>> GetMultipleCustomerTypePagingAsync(int pageIndex, int itemPerPage)
        {
            var customerType = await _customerType.GetListByPagingAsync(pageIndex, itemPerPage);
            return customerType;
        }
        public async Task<CustomerType> CreateCustomerTypeAsync(CustomerType customerTypeToCreate)
        {
            var customerType = await _customerType.SearchForSingleItemAsync(x => x.Name == customerTypeToCreate.Name);

            if (customerType != null)
            {
                throw new ExtendException(ErrorCode.Conflict, CommonConstants.ErrorMessage.ItemExisted);
            }

            return await _customerType.CreateAsync(customerTypeToCreate);
        }
        public async Task<CustomerType> UpdateCustomerTypeAsync(CustomerType customerTypeRequest)
        {
            var customerTypes = await _customerType.SearchForMultipleItemsAsync(x => x.Name == customerTypeRequest.Name);

            foreach (var i in customerTypes)
            {
                if (customerTypeRequest.Name == i.Name && customerTypeRequest.Id != i.Id)
                {
                    throw new ExtendException(ErrorCode.Conflict, CommonConstants.ErrorMessage.ItemExisted);
                }
            }

            return await _customerType.UpdateAsync(customerTypeRequest);
        }

        public async Task DeleteCustomerTypeAsync(Guid customerTypeId)
        {
            var customerType = await _customerType.SearchForSingleItemAsync(x => x.Id == customerTypeId);

            if (customerType == null)
            {
                throw new ExtendException(ErrorCode.NotFound, CommonConstants.ErrorMessage.ItemNotFound);
            }
            customerType.IsDeleted = true;

            await _customerType.UpdateAsync(customerType);
        }

        public async Task HardDeleteCustomerTypeAsync(Guid customerTypeId)
        {
            await _customerType.DeleteAsync(a => a.Id == customerTypeId);
        }
    }
}
