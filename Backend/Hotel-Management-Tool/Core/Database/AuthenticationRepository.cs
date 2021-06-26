using Hotel.Management.Tool.Core.Entities;
using Hotel.Management.Tool.Core.Interfaces.Authentication;

namespace Hotel.Management.Tool.Core.Database
{
    public class AuthenticationRepository : BaseCrudRepository<AppDbContext, Account>, IAuthenticationRepository
    {
        public AuthenticationRepository(AppDbContext context) : base(context)
        { }
    }
}
