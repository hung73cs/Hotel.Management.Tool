using Hotel.Management.Tool.Core.Entities;
using Hotel.Management.Tool.Core.Interfaces;

namespace Hotel.Management.Tool.Core.Database
{
    public class ParameterRepository:BaseCrudRepository<AppDbContext, Parameter>, IParameterRepository
    {
        public ParameterRepository(AppDbContext context): base(context) { }
    }
}
