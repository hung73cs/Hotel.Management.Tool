using Hotel.Management.Tool.Core.Entities;
using Hotel.Management.Tool.Core.Interfaces.Authentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Hotel.Management.Tool.Core.Database
{
    public class AuthenticationRepository : BaseCrudRepository<AppDbContext, Account>, IAuthenticationRepository
    {
        public AuthenticationRepository(AppDbContext context) : base(context)
        { }
    }
}
