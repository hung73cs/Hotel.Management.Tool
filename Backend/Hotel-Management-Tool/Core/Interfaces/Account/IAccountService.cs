using Hotel.Management.Tool.Core.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Hotel.Management.Tool.Core.Interfaces
{
    public interface IAccountService
    {
        Task<Account> GetAccountAsync(Guid accountId);
        Task<List<Account>> GetMultipleAccountPagingAsync(int pageIndex, int itemPerPage);
        Task<Account> CreateAsync(Account accountRequest);
        Task<Account> UpdateAsync(Account accountRequest);
        Task DeleteAsync(Guid accountId);
        Task HardDeleteAsync(Guid accountId);
        Task<List<Account>> GetAccountsAsync();
    }
}
