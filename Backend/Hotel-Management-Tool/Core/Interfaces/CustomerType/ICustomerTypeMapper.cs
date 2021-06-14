using Hotel.Management.Tool.Core.Entities;
using Hotel.Management.Tool.Models;

namespace Hotel.Management.Tool.Core.Interfaces
{
    public interface ICustomerTypeMapper
    {
        CustomerTypeModel MapCustomerTypeToCustomerTypeModel(CustomerType customerType);
        CustomerType MapCustomerTypeModelToCustomerType(CustomerTypeModel customerTypeModel);
        CustomerType MapCustomerTypeModelToCustomerType(CustomerTypeModel customerTypeModel, CustomerType customerTypeEntity);
    }
}
