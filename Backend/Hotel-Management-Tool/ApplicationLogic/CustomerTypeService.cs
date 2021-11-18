using Hotel.Management.Tool.Core.Constants;
using Hotel.Management.Tool.Core.Entities;
using Hotel.Management.Tool.Core.Enums;
using Hotel.Management.Tool.Core.Exceptions;
using Hotel.Management.Tool.Core.Interfaces;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Hotel.Management.Tool.ApplicationLogic
{
    public class GuestTypeService : IGuestTypeService
    {
        private readonly IGuestTypeRepository _GuestType;
        private readonly IBookingDetailRepository _bookingDetail;

        public GuestTypeService(IGuestTypeRepository GuestType, IBookingDetailRepository bookingDetail)
        {
            _GuestType = GuestType;
            _bookingDetail = bookingDetail;
        }

        public async Task<GuestType> GetGuestTypeAsync(Guid GuestTypeId)
        {
            var GuestType = await _GuestType.SearchForSingleItemAsync(x => x.Id == GuestTypeId);
            return GuestType;
        }

        public async Task<List<GuestType>> GetMultipleGuestTypePagingAsync(int pageIndex, int itemPerPage)
        {
            var GuestType = await _GuestType.GetListByPagingAsync(pageIndex, itemPerPage);
            return GuestType;
        }
        public async Task<GuestType> CreateGuestTypeAsync(GuestType GuestTypeToCreate)
        {
            var GuestType = await _GuestType.SearchForSingleItemAsync(x => x.Name == GuestTypeToCreate.Name);

            if (GuestType != null)
            {
                throw new ExtendException(ErrorCode.Conflict, CommonConstants.ErrorMessage.ItemExisted);
            }

            return await _GuestType.CreateAsync(GuestTypeToCreate);
        }
        public async Task<GuestType> UpdateGuestTypeAsync(GuestType GuestTypeRequest)
        {
            var GuestTypes = await _GuestType.SearchForMultipleItemsAsync(x => x.Name == GuestTypeRequest.Name);

            foreach (var i in GuestTypes)
            {
                if (GuestTypeRequest.Name == i.Name && GuestTypeRequest.Id != i.Id)
                {
                    throw new ExtendException(ErrorCode.Conflict, CommonConstants.ErrorMessage.ItemExisted);
                }
            }

            return await _GuestType.UpdateAsync(GuestTypeRequest);
        }

        public async Task DeleteGuestTypeAsync(Guid GuestTypeId)
        {
            var GuestType = await _GuestType.SearchForSingleItemAsync(x => x.Id == GuestTypeId);

            if (GuestType == null)
            {
                throw new ExtendException(ErrorCode.NotFound, CommonConstants.ErrorMessage.ItemNotFound);
            }

            var guestTypeInBookingDetail = await _bookingDetail.ExistsAsync(x => x.GuestTypeId == GuestTypeId);
            if (guestTypeInBookingDetail)
            {
                throw new ExtendException(ErrorCode.Conflict, CommonConstants.ErrorMessage.ExistFogreinKey);

            }
            GuestType.IsDeleted = true;

            await _GuestType.UpdateAsync(GuestType);
        }

        public async Task HardDeleteGuestTypeAsync(Guid GuestTypeId)
        {
            await _GuestType.DeleteAsync(a => a.Id == GuestTypeId);
        }

        public async Task<List<GuestType>> GetGuestTypesAsync()
        {
            return await _GuestType.GetListAsync();
        }
    }
}
