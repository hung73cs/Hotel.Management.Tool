using Hotel.Management.Tool.Core.Enums;
using Hotel.Management.Tool.Core.Exceptions;
using Hotel.Management.Tool.Core.Interfaces.Authentication;
using Hotel.Management.Tool.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

namespace Hotel.Management.Tool.Presentation.Controllers
{
    [Route("login")]
    public class AuthenticationController : ControllerBase
    {
        private readonly IAuthenticationService _authen;

        public AuthenticationController(
            IAuthenticationService authen)
        {
            _authen = authen;
        }

        [HttpPost]
        [AllowAnonymous]
        public async Task<ActionResult<TokenResponseModel>> Authenticate([FromBody]LoginModel loginAccount)
        {         
            var account = await _authen.AuthenticateUser(loginAccount);
            if (account == null)
            {
                throw new ExtendException(ErrorCode.Unauthorized, $"Can not login");
            }

            var tokenString = _authen.GenerateJwtToken(account);

            var tokenResponseModel = new TokenResponseModel
            {
                AccountId = account.Id,
                Username = account.Username,
                Role = account.Role,
                Token = tokenString
            };
            return Ok(tokenResponseModel);
        }
    }
}
