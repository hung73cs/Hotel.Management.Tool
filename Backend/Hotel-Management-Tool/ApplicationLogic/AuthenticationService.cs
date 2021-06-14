using Hotel.Management.Tool.Core.Entities;
using Hotel.Management.Tool.Core.Enums;
using Hotel.Management.Tool.Core.Exceptions;
using Hotel.Management.Tool.Core.Interfaces.Authentication;
using Hotel.Management.Tool.Models;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Hotel.Management.Tool.ApplicationLogic.User
{
    public class AuthenticationService : IAuthenticationService
    {
        private readonly IAuthenticationRepository _authenticate;
        private readonly IConfiguration _configuration;

        public AuthenticationService(
            IAuthenticationRepository authenticate,
            IConfiguration configuration
            )
        {
            _authenticate = authenticate;
            _configuration = configuration;
        }
        public async Task<Account> AuthenticateUser(LoginModel loginAccount)
        {
            var account = await _authenticate.SearchForSingleItemAsync(x => x.Username == loginAccount.Username);
            if (account == null)
            {
                throw new ExtendException(ErrorCode.Unauthorized, $"Can not login");

            }

            var checkedMatchingPassword = Utils.Utils.CheckMatchingPassword(loginAccount.Password, account.Password);

            if (!checkedMatchingPassword)
            {
                throw new ExtendException(ErrorCode.Unauthorized, $"Can not login");
            }
            return account;
        }

        public string GenerateJwtToken(Account account)
        {
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:SecretKey"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var claims = new[]
            {
                new Claim(JwtRegisteredClaimNames.Sub, account.Username),
                new Claim("username", account.Username.ToString()),
                new Claim(ClaimTypes.Role,account.Role.ToString()),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
            };
            var token = new JwtSecurityToken
                (
                    issuer: _configuration["Jwt:Issuer"],
                    audience: _configuration["Jwt:Audience"],
                    claims: claims,
                    expires: DateTime.Now.AddMinutes(3600),
                    signingCredentials: credentials
                );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
