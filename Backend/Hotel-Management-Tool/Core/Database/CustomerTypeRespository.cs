using Hotel.Management.Tool.Core.Entities;
using Hotel.Management.Tool.Core.Interfaces;

namespace Hotel.Management.Tool.Core.Database
{
    public class CustomerTypeRepository : BaseCrudRepository<AppDbContext, CustomerType>, ICustomerTypeRepository
    {
        public CustomerTypeRepository(AppDbContext context) : base(context)
        { }
    }
}
