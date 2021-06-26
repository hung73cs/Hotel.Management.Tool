using Hotel.Management.Tool.Core.Entities;
using Hotel.Management.Tool.Core.Interfaces;
using Hotel.Management.Tool.Models;
using Hotel.Management.Tool.Models.Booking;
using System;
using System.Collections.Generic;
using System.Linq;

namespace Hotel.Management.Tool.Presentation.Mappers
{
    public class BookingMapper : IBookingMapper
    {
        public Booking MapBookingModelToBooking(CreateBookingModel model)
        {
            var bookingDetails = new List<BookingDetail>();
            if (model.BookingDetailModels != null)
            {
                bookingDetails = model.BookingDetailModels.Select(x => new BookingDetail
                {
                    GuestName = x.GuestName,
                    GuestTypeId = x.GuestTypeId,
                    IdCard = x.IdCard,
                    Address = x.Address,
                }).ToList();
            }
            return new Booking
            {
                Id = Guid.NewGuid(),
                StartedDate = DateTime.Now,
                RoomId = model.RoomId,
                AccountId = model.AccountId,
                NumberOfGuest = model.NumberOfGuest,
                UnitPrice = model.UnitPrice,
                UnitStandardPrice = model.UnitStandardPrice,
                BookingDetails = bookingDetails,
            };
        }


        public BookingModel MappBookingToBookingModel(Booking booking)
        {
            var bookingDetailModels = new List<BookingDetailModel>();
            if (booking.BookingDetails != null)
            {
                bookingDetailModels = booking.BookingDetails.Select(x => new BookingDetailModel
                {
                    GuestName = x.GuestName,
                    GuestTypeId = x.GuestTypeId,
                    IdCard = x.IdCard,
                    Address = x.Address
                }).ToList();
            }
            return new BookingModel
            {
                Id = booking.Id,
                StartedDate = booking.StartedDate,
                RoomId = booking.RoomId,
                AccountId = booking.AccountId,
                NumberOfGuest = booking.NumberOfGuest,
                UnitPrice = booking.UnitPrice,
                UnitStandardPrice = booking.UnitStandardPrice,
                BookingDetailModels = bookingDetailModels,
            };
        }

        public List<BookingModel> MappBookingToBookingModel(List<Booking> bookings)
        {
            var bookingModels = new List<BookingModel>();
            foreach (var i in bookings)
            {
                var bookingDetailModels = new List<BookingDetailModel>();
                if (i.BookingDetails != null)
                {
                    bookingDetailModels = i.BookingDetails.Select(x => new BookingDetailModel
                    {
                        GuestName = x.GuestName,
                        GuestTypeId = x.GuestTypeId,
                        IdCard = x.IdCard,
                        Address = x.Address
                    }).ToList();
                }
                var bookingModel = new BookingModel()
                {
                    Id = i.Id,
                    StartedDate = i.StartedDate,
                    RoomId = i.RoomId,
                    AccountId = i.AccountId,
                    NumberOfGuest = i.NumberOfGuest,
                    UnitPrice = i.UnitPrice,
                    UnitStandardPrice = i.UnitStandardPrice,
                    BookingDetailModels = bookingDetailModels,
                };
                bookingModels.Add(bookingModel);
            }
            return bookingModels;
        }

        public Booking MapBookingModelToBooking(Booking bookingEntity, CreateBookingModel model)
        {
            var bookingDetails = new List<BookingDetail>();
            if (model.BookingDetailModels != null)
            {
                bookingDetails = model.BookingDetailModels.Select(x => new BookingDetail
                {
                    GuestName = x.GuestName,
                    GuestTypeId = x.GuestTypeId,
                    IdCard = x.IdCard,
                    Address = x.Address
                }).ToList();
            }
            if (model != null)
            {
                bookingEntity.RoomId = model.RoomId;
                bookingEntity.NumberOfGuest = model.NumberOfGuest;
                bookingEntity.UnitPrice = model.UnitPrice;
                bookingEntity.BookingDetails = bookingDetails;
            }
            return bookingEntity;
        }

    }
}