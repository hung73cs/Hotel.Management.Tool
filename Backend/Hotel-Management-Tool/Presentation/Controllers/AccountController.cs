using Hotel.Management.Tool.ApplicationLogic.Utils;
using Hotel.Management.Tool.Core.Constants;
using Hotel.Management.Tool.Core.Enums;
using Hotel.Management.Tool.Core.Exceptions;
using Hotel.Management.Tool.Core.Interfaces;
using Hotel.Management.Tool.Models.Account;
using Hotel.Management.Tool.Presentation.Extensions;
using Hotel.Management.Tool.Presentation.Mappers;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Hotel.Management.Tool.Presentation.Controllers
{
    [Authorize]
    [Route("account")]
    public class AccountController : ControllerBase
    {
        private readonly IAccountService _account;
        private readonly IAccountMapper _accountMapper;

        public AccountController(
            IAccountService account,
            IAccountMapper accountMapper)
        {
            _account = account;
            _accountMapper = accountMapper;
        }

        [HttpGet]
        [Route("id/{accountId}")]
        public async Task<ActionResult<GetAccountModel>> GetAccount(Guid accountId)
        {
            var account = await _account.GetAccountAsync(accountId);

            if (account == null)
            {
                throw new ExtendException(ErrorCode.NotFound, CommonConstants.ErrorMessage.ItemNotFound);
            }

            return Ok(
                _accountMapper.MapAccountToAccountModel(account));
        }

        [HttpGet]
        [Route("get/{page}/{item}")]
        public async Task<ActionResult<List<GetAccountModel>>> GetAccountsPagingAsync(int page, int item)
        {
            var accounts = await _account.GetMultipleAccountPagingAsync(page, item);

            if (accounts == null)
            {
                throw new ExtendException(ErrorCode.NotFound, CommonConstants.ErrorMessage.ItemNotFound);
            }
            return Ok(
                 _accountMapper.MapAccountToAccountModel(accounts));
        }

        [HttpGet]
        public async Task<ActionResult<List<GetAccountModel>>> GetAccountsAsync()
        {
            var accounts = await _account.GetAccountsAsync();

            if (accounts == null)
            {
                throw new ExtendException(ErrorCode.NotFound, CommonConstants.ErrorMessage.ItemNotFound);
            }
            return Ok(
                 _accountMapper.MapAccountToAccountModel(accounts));
        }

        [HttpPost]
        [AllowAnonymous]
        [Authorize(Roles = "ADMIN")]
        public async Task<ActionResult> CreateAccount([FromBody] CreateAccountModel account)
        {
            var mappedAccount = _accountMapper.MapAccountModelToAccount(account);

            if (mappedAccount == null)
            {
                throw new ExtendException(ErrorCode.Conflict, CommonConstants.ErrorMessage.WrongMapping);
            }

            var result = await _account.CreateAsync(mappedAccount);

            Response.AddInfoHeaders(result.Id);

            return NoContent();
        }

        [HttpPut]
        [Route("id/{accountId}")]
        [Authorize(Roles = "ADMIN")]
        public async Task<ActionResult> UpdateAccount(Guid accountId, [FromBody] UpdateAccountModel updatedAccount)
        {
            var currentAccount = await _account.GetAccountAsync(accountId);

            if (currentAccount == null)
            {
                throw new ExtendException(ErrorCode.NotFound, CommonConstants.ErrorMessage.ItemNotFound);
            }

            var mappedAccount = _accountMapper.MapAccountModelToAccount(updatedAccount, currentAccount);

            if (mappedAccount == null)
            {
                throw new ExtendException(ErrorCode.Conflict, CommonConstants.ErrorMessage.WrongMapping);
            }
            await _account.UpdateAsync(mappedAccount);

            return NoContent();
        }

        [HttpPut]
        [Route("id/{accountId}/changepassword")]
        public async Task<ActionResult> ChangePassword(Guid accountId, [FromBody] ChangePasswordModel changePassword)
        {
            var currentAccount = await _account.GetAccountAsync(accountId);

            if (currentAccount == null)
            {
                throw new ExtendException(ErrorCode.NotFound, CommonConstants.ErrorMessage.ItemNotFound);
            }

            var checkedMatchingPassword = Utils.CheckMatchingPassword(changePassword.Password, currentAccount.Password);

            if (!checkedMatchingPassword)
            {
                throw new ExtendException(ErrorCode.Conflict, $"Mat khau cu khong chinh xac");
            }

            var mappedAccount = _accountMapper.MapAccountModelToAccount(changePassword.NewPassword, currentAccount);

            if (mappedAccount == null)
            {
                throw new ExtendException(ErrorCode.Conflict, CommonConstants.ErrorMessage.WrongMapping);
            }
            await _account.UpdateAsync(mappedAccount);

            return NoContent();
        }


        [HttpDelete]
        [Route("id/{accountId}")]
        [Authorize(Roles = "ADMIN")]
        public async Task<ActionResult> DeleteAccount(Guid accountId)
        {
            await _account.DeleteAsync(accountId);

            return NoContent();
        }

        [HttpDelete]
        [Route("id/{accountId}/hard-delete")]
        [Authorize(Roles = "ADMIN")]
        public async Task<ActionResult> HardDeleteAccount(Guid accountId)
        {
            await _account.HardDeleteAsync(accountId);

            return NoContent();
        }
    }
}
