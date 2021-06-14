using Hotel.Management.Tool.Core.Entities;
using Hotel.Management.Tool.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Hotel.Management.Tool.Core.Database
{
    public class UserInfoRepository : BaseCrudRepository<AppDbContext, UserInfo>, IUserInfoRepository
    {
        public UserInfoRepository(AppDbContext context) : base(context)
        {}
    }
}
