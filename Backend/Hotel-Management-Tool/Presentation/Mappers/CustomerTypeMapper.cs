using Hotel.Management.Tool.Core.Entities;
using Hotel.Management.Tool.Core.Interfaces;
using Hotel.Management.Tool.Models;
using Hotel.Management.Tool.Models.GuestType;
using System.Collections.Generic;

namespace Hotel.Management.Tool.Presentation.Mappers
{
    public class GuestTypeMapper : IGuestTypeMapper
    {
        private readonly IGuestTypeRepository _GuestTypeRepository;

        public GuestTypeMapper(IGuestTypeRepository GuestTypeRepository)
        {
            _GuestTypeRepository = GuestTypeRepository;
        }

        public GuestTypeModel MapGuestTypeToGuestTypeModel(GuestType GuestType)
        {
            var GuestTypeModel = new GuestTypeModel
            {
                Id = GuestType.Id,
                Name = GuestType.Name,
                SurchargeRate = GuestType.SurchargeRate
            };

            return GuestTypeModel;
        }

        public GuestType MapGuestTypeModelToGuestType(CreateGuestTypeModel GuestTypeModel)
        {
            var GuestType = new GuestType
            {
                Name = GuestTypeModel.Name,
                SurchargeRate = GuestTypeModel.SurchargeRate
            };

            return GuestType;
        }

        public GuestType MapGuestTypeModelToGuestType(CreateGuestTypeModel GuestTypeModel, GuestType GuestType)
        {

            GuestType.Name = GuestTypeModel.Name;
            GuestType.SurchargeRate = GuestTypeModel.SurchargeRate;

            return GuestType;
        }

        public List<GuestTypeModel> MapGuestTypesToGuestTypeModels(List<GuestType> GuestTypes)
        {
            var GuestTypeModels = new List<GuestTypeModel>();
            foreach(var i in GuestTypes)
            {
                var GuestTypeModel = new GuestTypeModel
                {
                    Id = i.Id,
                    Name = i.Name,
                    SurchargeRate = i.SurchargeRate
                };
                GuestTypeModels.Add(GuestTypeModel);
            }
            return GuestTypeModels;
        }
    }
}
