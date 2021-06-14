using Hotel.Management.Tool.Models;
using System;

namespace Hotel.Management.Tool.Presentation.Mappers
{
    public class GetAccountModel
    {
        public Guid accountId { get; set; }
        public GetAccountModel()
        {
            UserInfoModel = new UserInfoModel();
        }
        public string Username { get; set; }
        public string Role { get; set; }
        public UserInfoModel UserInfoModel { get; set; }
    }
}
