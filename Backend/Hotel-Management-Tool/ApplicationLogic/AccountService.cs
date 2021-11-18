using Hotel.Management.Tool.Core.Constants;
using Hotel.Management.Tool.Core.Entities;
using Hotel.Management.Tool.Core.Enums;
using Hotel.Management.Tool.Core.Exceptions;
using Hotel.Management.Tool.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Hotel.Management.Tool.ApplicationLogic
{
    public class AccountService : IAccountService
    {
        private readonly IAccountRepository _account;
        private readonly IBookingRepository _booking;
        public AccountService(IAccountRepository account, IBookingRepository booking)
        {
            _account = account;
            _booking = booking;
        }

        public async Task<Account> GetAccountAsync(Guid accountId)
        {
            var account = await _account.SearchForSingleItemAsync(x => x.Id == accountId, x => x.UserInfo);
            return account;
        }

        public async Task<List<Account>> GetAccountsAsync()
        {
            var accounts = await _account.GetListAsync();
            var results = new List<Account>();
            foreach (var i in accounts)
            {
                var account = await _account.SearchForSingleItemAsync(x => x.Id == i.Id, x => x.UserInfo);
                results.Add(account);
            }
            return results;
        }

        public async Task<List<Account>> GetMultipleAccountPagingAsync(int pageIndex, int itemPerPage)
        {
            var account = await _account.GetListByPagingAsync(pageIndex, itemPerPage);
            return account;
        }

        public async Task DeleteAsync(Guid accountId)
        {
            var account = await _account.SearchForSingleItemAsync(x => x.Id == accountId);

            if (account == null)
            {
                throw new ExtendException(ErrorCode.NotFound, CommonConstants.ErrorMessage.ItemNotFound);
            }

            var accountInBooking = await _booking.ExistsAsync(x => x.AccountId == accountId);

            if (accountInBooking)
            {
                throw new ExtendException(ErrorCode.Conflict, CommonConstants.ErrorMessage.ExistFogreinKey);
            }
            account.IsDeleted = true;

            await _account.UpdateAsync(account);
        }

        public async Task HardDeleteAsync(Guid accountId)
        {
            await _account.DeleteAsync(x => x.Id == accountId);
        }

        public async Task<Account> CreateAsync(Account accountRequest)
        {
            var account = await _account.SearchForSingleItemAsync(x => x.Username == accountRequest.Username);

            if (account != null)
            {
                throw new ExtendException(ErrorCode.Conflict, CommonConstants.ErrorMessage.ItemExisted);
            }

            return await _account.CreateAsync(accountRequest);
        }

        public async Task<Account> UpdateAsync(Account accountRequest)
        {
            return await _account.UpdateAsync(accountRequest);
        }
    }
}
