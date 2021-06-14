﻿using Hotel.Management.Tool.Core.Constants;
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
        public AccountService(IAccountRepository account)
        {
            _account = account;
        }

        public async Task<Account> GetAccountAsync(Guid accountId)
        {
            var account = await _account.SearchForSingleItemAsync(x => x.Id == accountId, x => x.UserInfo);
            return account;
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