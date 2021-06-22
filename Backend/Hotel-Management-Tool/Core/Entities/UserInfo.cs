using Hotel.Management.Tool.Core.Enums;
using System;

namespace Hotel.Management.Tool.Core.Entities
{
    public class UserInfo : Base
    {
        public string Name { get; set; }
        public Gender Gender { get; set; }
        public DateTime Birthday { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
        public string IdCard { get; set; }
        public Guid AccountId { get; set; }
        public virtual Account Account { get; set; }

    }
}
