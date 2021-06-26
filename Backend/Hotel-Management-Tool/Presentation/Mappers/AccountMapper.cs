using Hotel.Management.Tool.ApplicationLogic.Utils;
using Hotel.Management.Tool.Core.Entities;
using Hotel.Management.Tool.Core.Enums;
using Hotel.Management.Tool.Core.Interfaces;
using Hotel.Management.Tool.Models;
using Hotel.Management.Tool.Models.Account;
using System;
using System.Collections.Generic;

namespace Hotel.Management.Tool.Presentation.Mappers
{
    public class AccountMapper : IAccountMapper
    {
        private readonly IAccountRepository _account;
        private readonly IUserInfoRepository _userInfo;
        private readonly IEnumMapper _enumMapper;
        public AccountMapper(
            IAccountRepository account,
            IUserInfoRepository userInfo,
            IEnumMapper enumMapper)
        {
            _account = account;
            _userInfo = userInfo;
            _enumMapper = enumMapper;
        }
        public GetAccountModel MapAccountToAccountModel(Account account)
        {
            var accountModel = new GetAccountModel
            {
                accountId = account.Id,
                Username = account.Username,
                Role = account.Role.ToString()
            };
            if (account.UserInfo != null)
            {
                var userInfoModel = new UserInfoModel
                {
                    Name = account.UserInfo.Name,
                    Gender = account.UserInfo.Gender.ToString(),
                    Birthday = account.UserInfo.Birthday,
                    PhoneNumber = account.UserInfo.PhoneNumber,
                    Address = account.UserInfo.Address,
                    IdCard = account.UserInfo.IdCard,
                };

                accountModel.UserInfoModel = userInfoModel;
            }
            return accountModel;
        }

        public List<GetAccountModel> MapAccountToAccountModel(List<Account> accounts)
        {
            List<GetAccountModel> getAccountModels = new List<GetAccountModel>();
            foreach (var i in accounts)
            {
                var accountModel = new GetAccountModel
                {
                    accountId = i.Id,
                    Username = i.Username,
                    Role = i.Role.ToString()
                };
                if (i.UserInfo != null)
                {
                    var userInfoModel = new UserInfoModel
                    {
                        Name = i.UserInfo.Name,
                        Gender = i.UserInfo.Gender.ToString(),
                        Birthday = i.UserInfo.Birthday,
                        PhoneNumber = i.UserInfo.PhoneNumber,
                        Address = i.UserInfo.Address,
                        IdCard = i.UserInfo.IdCard,
                    };
                    accountModel.UserInfoModel = userInfoModel;
                }
                getAccountModels.Add(accountModel);
            }

            return getAccountModels;
        }

        public Account MapAccountModelToAccount(CreateAccountModel accountModel)
        {

            var account = new Account
            {
                Id = Guid.NewGuid(),
                Username = accountModel.Username,
                Password = Utils.HashPassword(accountModel.Password),
                Role = _enumMapper.Map<Role>(accountModel.Role).Value
            };
            if (accountModel.UserInfoModel != null)
            {
                var userInfo = new UserInfo
                {
                    Id = Guid.NewGuid(),
                    AccountId = account.Id,
                    Name = accountModel.UserInfoModel.Name,
                    Gender = _enumMapper.Map<Gender>(accountModel.UserInfoModel.Gender).Value,
                    Birthday = accountModel.UserInfoModel.Birthday,
                    PhoneNumber = accountModel.UserInfoModel.PhoneNumber,
                    Address = accountModel.UserInfoModel.Address,
                    IdCard = accountModel.UserInfoModel.IdCard,
                };

                account.UserInfo = userInfo;
            }
            return account;
        }

        public Account MapAccountModelToAccount(UpdateAccountModel accountModel, Account accountEntity)
        {

            if (accountModel.UserInfoModel != null)
            {
                accountEntity.UserInfo.Id = accountEntity.UserInfo.Id;
                accountEntity.UserInfo.AccountId = accountEntity.UserInfo.AccountId;
                accountEntity.UserInfo.Name = accountModel.UserInfoModel.Name;
                accountEntity.UserInfo.Gender = _enumMapper.Map<Gender>(accountModel.UserInfoModel.Gender).Value;
                accountEntity.UserInfo.Birthday = accountModel.UserInfoModel.Birthday;
                accountEntity.UserInfo.PhoneNumber = accountModel.UserInfoModel.PhoneNumber;
                accountEntity.UserInfo.Address = accountModel.UserInfoModel.Address;
            }
            return accountEntity;
        }
    }
}
