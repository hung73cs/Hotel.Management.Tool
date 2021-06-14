using System;
using System.Collections.Generic;
using System.Linq;
using Hotel.Management.Tool.Core.Entities;
using Hotel.Management.Tool.Core.Interfaces;
using Hotel.Management.Tool.Models;
using Hotel.Management.Tool.Models.Booking;

namespace Hotel.Management.Tool.Presentation.Mappers
{
    public class BookingMapper : IBookingMapper
    {
        public Booking MapBookingModelToBooking(CreateBookingModel model)
        {
            var bookingDetails = new List<BookingDetail>();
            if (model.BookingDetails != null)
            {
                bookingDetails = model.BookingDetails.Select(x => new BookingDetail
                {
                    CustomerName = x.CustomerName,
                    CustomerTypeId = x.CustomerTypeId,
                    IdCard = x.IdCard,
                    Address = x.Address
                }).ToList();
            }
            return new Booking
            {
                Id = Guid.NewGuid(),
                StartedDate = model.StartedDate == null ? DateTime.Now : model.StartedDate,
                RoomId = model.RoomId,
                AccountId = model.AccountId,
                NumberOfCustomer = model.NumberOfCustomer,
                UnitPrice = model.UnitPrice,
                UnitStandardPrice = model.UnitStandardPrice,
                BookingDetails = bookingDetails,
            };
        }


        public BookingModel MappBookingToBookingModel(Booking booking)
        {
            var bookingDetails = new List<BookingDetail>();
            if (booking.BookingDetails != null)
            {
                bookingDetails = booking.BookingDetails.Select(x => new BookingDetail
                {
                    CustomerName = x.CustomerName,
                    CustomerTypeId = x.CustomerTypeId,
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
                NumberOfCustomer = booking.NumberOfCustomer,
                UnitPrice = booking.UnitPrice,
                UnitStandardPrice = booking.UnitStandardPrice,
                BookingDetails = bookingDetails,
            };
        }

        public List<BookingModel> MappBookingToBookingModel(List<Booking> bookings)
        {
            var bookingModels = new List<BookingModel>();
            foreach (var i in bookings)
            {
                var bookingDetails = new List<BookingDetail>();
                if (i.BookingDetails != null)
                {
                    bookingDetails = i.BookingDetails.Select(x => new BookingDetail
                    {
                        CustomerName = x.CustomerName,
                        CustomerTypeId = x.CustomerTypeId,
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
                    NumberOfCustomer = i.NumberOfCustomer,
                    UnitPrice = i.UnitPrice,
                    UnitStandardPrice = i.UnitStandardPrice,
                    BookingDetails = bookingDetails,
                };
                bookingModels.Add(bookingModel);
            }
            return bookingModels;
        }

        public Booking MapBookingModelToBooking(Booking bookingEntity, CreateBookingModel model)
        {
            var bookingDetails = new List<BookingDetail>();
            if (model.BookingDetails != null)
            {
                bookingDetails = model.BookingDetails.Select(x => new BookingDetail
                {
                    CustomerName = x.CustomerName,
                    CustomerTypeId = x.CustomerTypeId,
                    IdCard = x.IdCard,
                    Address = x.Address
                }).ToList();
            }
            if (model != null)
            {
                bookingEntity.StartedDate = model.StartedDate;
                bookingEntity.RoomId = model.RoomId;
                bookingEntity.NumberOfCustomer = model.NumberOfCustomer;
                bookingEntity.UnitPrice = model.UnitPrice;
                bookingEntity.StartedDate = model.StartedDate;
                bookingEntity.BookingDetails = bookingDetails;
            }
            return bookingEntity;
        }

    }
}