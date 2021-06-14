using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using Hotel.Management.Tool.Core.Entities;

namespace Hotel.Management.Tool.Core.Interfaces
{
    public interface IAccountRepository : IBaseCrudRepository<Account>
    {
        Task<Account> SoftDeleteAsync(Guid accountId);
    }
}
