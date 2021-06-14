using Hotel.Management.Tool.Core.Entities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Hotel.Management.Tool.Core.Interfaces
{
    public interface IGuestTypeService
    {
        Task<GuestType> GetGuestTypeAsync(Guid id);
        Task<List<GuestType>> GetMultipleGuestTypePagingAsync(int pageIndex, int itemPerPage);
        Task<GuestType> CreateGuestTypeAsync(GuestType GuestType);
        Task<GuestType> UpdateGuestTypeAsync(GuestType GuestType);
        Task DeleteGuestTypeAsync(Guid GuestTypeId);
        Task HardDeleteGuestTypeAsync(Guid GuestTypeId);
        Task<List<GuestType>> GetGuestTypesAsync();

    }
}
