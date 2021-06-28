using Hotel.Management.Tool.Core.Entities;
using Hotel.Management.Tool.Core.Interfaces;

namespace Hotel.Management.Tool.Core.Database
{
    public class ReportRepository : BaseCrudRepository<AppDbContext, Report>, IReportRepository
    {
        public ReportRepository(AppDbContext context) : base(context)
        { }
    }
}
