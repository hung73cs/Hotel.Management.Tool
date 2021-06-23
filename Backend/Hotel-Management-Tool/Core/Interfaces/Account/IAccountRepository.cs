using Hotel.Management.Tool.Core.Entities;
using System;
using System.Threading.Tasks;

namespace Hotel.Management.Tool.Core.Interfaces
{
    public interface IAccountRepository : IBaseCrudRepository<Account>
    {
        Task<Account> SoftDeleteAsync(Guid accountId);
    }
}
