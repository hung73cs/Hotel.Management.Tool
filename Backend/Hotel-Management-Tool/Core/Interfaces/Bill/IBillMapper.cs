using Hotel.Management.Tool.Core.Entities;
using Hotel.Management.Tool.Models.Bill;
using System.Collections.Generic;

namespace Hotel.Management.Tool.Core.Interfaces
{
    public interface IBillMapper
    {
        Bill MapBillModelToBill(CreateBillModel model);
        Bill MapBillModelToBill(Bill billEntity, CreateBillModel model);
        BillModel MapBillToBillModel(Bill bill);
        List<BillModel> MapBillToBillModel(List<Bill> bills);
    }
}
