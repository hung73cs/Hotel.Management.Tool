using Hotel.Management.Tool.Core.Entities;
using Hotel.Management.Tool.Core.Interfaces;
using Hotel.Management.Tool.Models;
using Hotel.Management.Tool.Models.CustomerType;
using System.Collections.Generic;

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
                Id = customerType.Id,
                Name = customerType.Name,
                SurchargeRate = customerType.SurchargeRate
            };

            return customerTypeModel;
        }

        public CustomerType MapCustomerTypeModelToCustomerType(CreateCustomerTypeModel customerTypeModel)
        {
            var customerType = new CustomerType
            {
                Name = customerTypeModel.Name,
                SurchargeRate = customerTypeModel.SurchargeRate
            };

            return customerType;
        }

        public CustomerType MapCustomerTypeModelToCustomerType(CreateCustomerTypeModel customerTypeModel, CustomerType customerType)
        {

            customerType.Name = customerTypeModel.Name;
            customerType.SurchargeRate = customerTypeModel.SurchargeRate;

            return customerType;
        }

        public List<CustomerTypeModel> MapCustomerTypesToCustomerTypeModels(List<CustomerType> customerTypes)
        {
            var customerTypeModels = new List<CustomerTypeModel>();
            foreach(var i in customerTypes)
            {
                var customerTypeModel = new CustomerTypeModel
                {
                    Id = i.Id,
                    Name = i.Name,
                    SurchargeRate = i.SurchargeRate
                };
                customerTypeModels.Add(customerTypeModel);
            }
            return customerTypeModels;
        }
    }
}
