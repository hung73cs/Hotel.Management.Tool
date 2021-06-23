using Hotel.Management.Tool.Models;

namespace Hotel.Management.Tool.Presentation.Mappers
{
    public class CreateAccountModel
    {
        public CreateAccountModel()
        {
            UserInfoModel = new UserInfoModel();
        }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Role { get; set; }
        public UserInfoModel UserInfoModel { get; set; }
    }
}
