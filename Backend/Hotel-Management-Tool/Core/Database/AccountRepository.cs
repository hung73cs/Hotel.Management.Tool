using Hotel.Management.Tool.Core.Entities;
using Hotel.Management.Tool.Core.Interfaces;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web.Http;

namespace Hotel.Management.Tool.Core.Database
{
    public class AccountRepository : BaseCrudRepository<AppDbContext, Account>, IAccountRepository
    {
        public AccountRepository(AppDbContext context) : base(context)
        {
        }

        public async Task<Account> SoftDeleteAsync(Guid accountId)
        {
            try
            {
                var account = _dbSet.Where(x => x.Id == accountId).FirstOrDefault();
                if (account == null)
                {
                    throw new Exception("Account does not exist.");
                }

                account.IsDeleted = true;

                _dbSet.Update(account);

                await _dbContext.SaveChangesAsync();

                _dbContext.Entry(account).State = EntityState.Detached;

                return account;
            }
            catch (Exception)
            {
                throw new HttpResponseException(HttpStatusCode.BadRequest);
            }
        }     
    }
}
