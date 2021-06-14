using Hotel.Management.Tool.Core.Entities;
using Hotel.Management.Tool.Core.Interfaces;
using Hotel.Management.Tool.Models;

namespace Hotel.Management.Tool.Presentation.Mappers
{
    public class CustomerTypeMapper : ICustomerTypeMapper
    {
        private readonly ICustomerTypeRepository _customerTypeRepository;

        public CustomerTypeMapper(ICustomerTypeRepository customerTypeRepository)
        {
            _customerTypeRepository = customerTypeRepository;
        }

        public CustomerTypeModel MapCustomerTypeToCustomerTypeModel(CustomerType customerType)
        {
            var customerTypeModel = new CustomerTypeModel
            {
                Name = customerType.Name,
                SurchargeRate = customerType.SurchargeRate
            };

            return customerTypeModel;
        }

        public CustomerType MapCustomerTypeModelToCustomerType(CustomerTypeModel customerTypeModel)
        {
            var customerType = new CustomerType
            {
                Name = customerTypeModel.Name,
                SurchargeRate = customerTypeModel.SurchargeRate
            };

            return customerType;
        }

        public CustomerType MapCustomerTypeModelToCustomerType(CustomerTypeModel customerTypeModel, CustomerType customerType)
        {

            customerType.Name = customerTypeModel.Name;
            customerType.SurchargeRate = customerTypeModel.SurchargeRate;

            return customerType;
        }
    }
}
