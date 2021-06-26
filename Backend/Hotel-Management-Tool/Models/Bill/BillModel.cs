using System;
using System.Collections.Generic;

namespace Hotel.Management.Tool.Models.Bill
{
    public class BillModel
    {
        public Guid Id { get; set; }
        public DateTime CreatedDate { get; set; }
        public string GuestName { get; set; }
        public string Address { get; set; }
        public decimal TotalPrice { get; set; }
        public ICollection<BillDetailModel> BillDetailModels { get; set; }
    }
}
