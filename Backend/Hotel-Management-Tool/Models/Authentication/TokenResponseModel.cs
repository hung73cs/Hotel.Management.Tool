using Hotel.Management.Tool.Core.Enums;
using System;

namespace Hotel.Management.Tool.Models
{
    public class TokenResponseModel
    {
        public Guid AccountId { get; set; }
        public string Username { get; set; }
        public Role Role { get; set; }
        public string Token { get; set; }
    }
}
