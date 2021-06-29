using Hotel.Management.Tool.Core.Entities;
using Hotel.Management.Tool.Core.Interfaces;
using Hotel.Management.Tool.Models.Bill;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Hotel.Management.Tool.Presentation.Mappers
{
    public class BillMapper : IBillMapper
    {
        public Bill MapBillModelToBill(CreateBillModel model)
        {
            var billDetails = new List<BillDetail>();
            if (model.BillDetailModels != null)
            {
                billDetails = model.BillDetailModels.Select(x => new BillDetail
                {
                    BookingId = x.BookingId,
                    NumberOfRentalDays = x.NumberOfRentalDays,
                    UnitPrice = x.UnitPrice,
                    Price = x.Price
                }).ToList();
            }
            return new Bill
            {
                Id = Guid.NewGuid(),
                CreatedDate = DateTime.Now,
                GuestName = model.GuestName,
                Address = model.Address,
                TotalPrice = model.TotalPrice,
                BillDetails = billDetails
            };
        }

        public Bill MapBillModelToBill(Bill billEntity, CreateBillModel model)
        {
            var billDetails = new List<BillDetail>();
            if (model.BillDetailModels != null)
            {
                billDetails = model.BillDetailModels.Select(x => new BillDetail
                {
                    BookingId = x.BookingId,
                    NumberOfRentalDays = x.NumberOfRentalDays,
                    UnitPrice = x.UnitPrice,
                    Price = x.Price
                }).ToList();
            }
            if (model != null)
            {
                billEntity.CreatedDate = model.CreatedDate;
                billEntity.GuestName = model.GuestName;
                billEntity.Address = model.Address;
                billEntity.TotalPrice = model.TotalPrice;
                billEntity.BillDetails = billDetails;
            }
            return billEntity;
        }

        public BillModel MapBillToBillModel(Bill bill)
        {
            var billDetailModel = new List<BillDetailModel>();
            if (bill.BillDetails != null)
            {
                billDetailModel = bill.BillDetails.Select(x => new BillDetailModel
                {
                    BookingId = x.BookingId,
                    NumberOfRentalDays = x.NumberOfRentalDays,
                    UnitPrice = x.UnitPrice,
                    Price = x.Price
                }).ToList();
            }
            return new BillModel
            {
                Id = bill.Id,
                CreatedDate = bill.CreatedDate,
                GuestName = bill.GuestName,
                Address = bill.Address,
                TotalPrice = bill.TotalPrice,
                BillDetailModels = billDetailModel
            };
        }

        public List<BillModel> MapBillToBillModel(List<Bill> bills)
        {
            var billModels = new List<BillModel>();
            foreach (var i in bills)
            {
                var billDetailModel = new List<BillDetailModel>();

                if (i.BillDetails != null)
                {
                    billDetailModel = i.BillDetails.Select(x => new BillDetailModel
                    {
                        BookingId = x.BookingId,
                        NumberOfRentalDays = x.NumberOfRentalDays,
                        UnitPrice = x.UnitPrice,
                        Price = x.Price
                    }).ToList();
                }
                var billModel = new BillModel()
                {
                    Id = i.Id,
                    CreatedDate = i.CreatedDate,
                    GuestName = i.GuestName,
                    Address = i.Address,
                    TotalPrice = i.TotalPrice,
                    BillDetailModels = billDetailModel
                };
                billModels.Add(billModel);
            }
            return billModels;
        }
    }
}
