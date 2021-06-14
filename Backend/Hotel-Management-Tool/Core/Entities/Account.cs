using System;
using System.Collections.Generic;
using Hotel.Management.Tool.Core.Enums;

namespace Hotel.Management.Tool.Core.Entities
{
    public class Account : Base
    {
        public string Username { get; set; }
        public string Password { get; set; }
        public Role Role { get; set; }
        public virtual ICollection<Booking> Bookings { get; set; }
        public virtual UserInfo UserInfo{ get; set; }
    }
}
