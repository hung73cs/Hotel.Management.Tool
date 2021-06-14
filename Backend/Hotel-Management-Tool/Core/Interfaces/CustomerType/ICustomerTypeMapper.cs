using Hotel.Management.Tool.Core.Entities;
using Hotel.Management.Tool.Models;
using Hotel.Management.Tool.Models.GuestType;
using System.Collections.Generic;

namespace Hotel.Management.Tool.Core.Interfaces
{
    public interface IGuestTypeMapper
    {
        GuestTypeModel MapGuestTypeToGuestTypeModel(GuestType GuestType);
        GuestType MapGuestTypeModelToGuestType(CreateGuestTypeModel GuestTypeModel);
        GuestType MapGuestTypeModelToGuestType(CreateGuestTypeModel GuestTypeModel, GuestType GuestTypeEntity);
        List<GuestTypeModel> MapGuestTypesToGuestTypeModels(List<GuestType> GuestTypes);
    }
}
