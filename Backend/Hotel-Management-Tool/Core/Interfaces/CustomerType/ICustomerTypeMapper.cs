using Hotel.Management.Tool.Core.Entities;
using Hotel.Management.Tool.Models;
using Hotel.Management.Tool.Models.CustomerType;
using System.Collections.Generic;

namespace Hotel.Management.Tool.Core.Interfaces
{
    public interface ICustomerTypeMapper
    {
        CustomerTypeModel MapCustomerTypeToCustomerTypeModel(CustomerType customerType);
        CustomerType MapCustomerTypeModelToCustomerType(CreateCustomerTypeModel customerTypeModel);
        CustomerType MapCustomerTypeModelToCustomerType(CreateCustomerTypeModel customerTypeModel, CustomerType customerTypeEntity);
        List<CustomerTypeModel> MapCustomerTypesToCustomerTypeModels(List<CustomerType> customerTypes);
    }
}
