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
    public class ParameterService : IParameterService
    {
        private readonly IParameterRepository _parameter;

        public ParameterService(IParameterRepository parameter)
        {
            _parameter = parameter;
        }

        public async Task<Parameter> GetParameterAsync(Guid parameterId)
        {
            var parameter = await _parameter.SearchForSingleItemAsync(x => x.Id == parameterId);
            return parameter;
        }

        public async Task<List<Parameter>> GetMutipleParameterPagingAsync(int pageIndex, int itemPerPage)
        {
            var parameter = await _parameter.GetListByPagingAsync(pageIndex, itemPerPage);
            return parameter;
        }

        public async Task<Parameter> CreateParameterAsync(Parameter parameterToCreate)
        {
            var parameter = await _parameter.SearchForSingleItemAsync(x => x.Name == parameterToCreate.Name);
            if (parameter != null)
            {
                throw new ExtendException(ErrorCode.Conflict, CommonConstants.ErrorMessage.ItemExisted);
            }
            return await _parameter.CreateAsync(parameterToCreate);
        }

        public async Task<Parameter> UpdateParameterAsync(Parameter parameterRequest)
        {
            var parameters = await _parameter.SearchForMultipleItemsAsync(x => x.Name == parameterRequest.Name);
            foreach (var i in parameters)
            {
                if (parameterRequest.Name == i.Name && parameterRequest.Id != i.Id)
                {
                    throw new ExtendException(ErrorCode.Conflict, CommonConstants.ErrorMessage.ItemExisted);
                }
            }
            return await _parameter.UpdateAsync(parameterRequest);
        }

        public async Task DeleteParameterAsync(Guid parameterId)
        {
            var parameter = await _parameter.SearchForSingleItemAsync(x => x.Id == parameterId);

            if (parameter == null)
            {
                throw new ExtendException(ErrorCode.NotFound, CommonConstants.ErrorMessage.ItemNotFound);
            }
            parameter.IsDeleted = true;

            await _parameter.UpdateAsync(parameter);

        }

        public async Task HardDeleteParameterAsync(Guid parameterId)
        {
            await _parameter.DeleteAsync(a => a.Id == parameterId);
        }


    }
}
