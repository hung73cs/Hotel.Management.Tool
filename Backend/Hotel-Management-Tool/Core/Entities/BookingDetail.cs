using System;

namespace Hotel.Management.Tool.Core.Entities
{
    public class BillDetail : Base
    {
        public string GuestName { get; set; }
        public Guid GuestTypeId { get; set; }
        public string IdCard { get; set; }
        public string Address { get; set; }
        public Guid BillId { get; set; }
        public virtual GuestType GuestType { get; set; }
        public virtual Bill Bill { get; set; }
    }
}
