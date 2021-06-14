using Hotel.Management.Tool.Core.Entities;
using Hotel.Management.Tool.Models;
using System.Threading.Tasks;

namespace Hotel.Management.Tool.Core.Interfaces.Authentication
{
    public interface IAuthenticationService
    {
        Task<Account> AuthenticateUser(LoginModel login);

        string GenerateJwtToken(Account account);
    }
}
