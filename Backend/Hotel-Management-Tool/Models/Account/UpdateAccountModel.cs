using System;

namespace Hotel.Management.Tool.Models.Account
{
    public class UpdateAccountModel
    {
        public UpdateAccountModel()
        {
            UserInfoModel = new UserInfoModel();
        }
        public UserInfoModel UserInfoModel { get; set; }
    }
}
