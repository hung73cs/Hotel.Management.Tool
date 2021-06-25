using Hotel.Management.Tool.Core.Entities;
using Hotel.Management.Tool.Core.Interfaces;

namespace Hotel.Management.Tool.Core.Database
{
    public class BillRepository :  BaseCrudRepository<AppDbContext, Bill>, IBillRepository
    {
        public BillRepository(AppDbContext context) : base(context)
        { }
    }
}
