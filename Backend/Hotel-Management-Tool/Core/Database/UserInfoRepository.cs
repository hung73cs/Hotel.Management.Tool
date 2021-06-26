using Hotel.Management.Tool.Core.Entities;
using Hotel.Management.Tool.Core.Interfaces;

namespace Hotel.Management.Tool.Core.Database
{
    public class UserInfoRepository : BaseCrudRepository<AppDbContext, UserInfo>, IUserInfoRepository
    {
        public UserInfoRepository(AppDbContext context) : base(context)
        { }
    }
}
