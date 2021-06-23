using Hotel.Management.Tool.Core.Entities;
using Hotel.Management.Tool.Core.Interfaces;

namespace Hotel.Management.Tool.Core.Database
{
    public class SurchargeRateRepository : BaseCrudRepository<AppDbContext, SurchargeRate>, ISurchargeRateRepository
    {
        public SurchargeRateRepository(AppDbContext context) : base(context)
        { }
    }

}