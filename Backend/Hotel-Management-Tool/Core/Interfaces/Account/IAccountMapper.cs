using Hotel.Management.Tool.Core.Entities;
using Hotel.Management.Tool.Models.Account;
using Hotel.Management.Tool.Presentation.Mappers;
using System;
using System.Collections.Generic;

namespace Hotel.Management.Tool.Core.Interfaces
{
    public interface IAccountMapper
    {
        GetAccountModel MapAccountToAccountModel(Account account);
        List<GetAccountModel> MapAccountToAccountModel(List<Account> accounts);
        Account MapAccountModelToAccount(CreateAccountModel accountModel);
        Account MapAccountModelToAccount(UpdateAccountModel accountModel, Account accountEntity);
    }
}
