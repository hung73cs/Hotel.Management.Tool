using Hotel.Management.Tool.Core.Entities;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Hotel.Management.Tool.Core.Interfaces
{
    public interface IParameterService
    {
        Task<Parameter> GetParameterAsync(Guid id);
        Task<List<Parameter>> GetParametersAsync();
        Task<List<Parameter>> GetMutipleParameterPagingAsync(int pageIndex, int itemPerPage);
        Task<Parameter> CreateParameterAsync(Parameter paremeter);
        Task<Parameter> UpdateParameterAsync(Parameter parameter);
        Task DeleteParameterAsync(Guid parameter);
        Task HardDeleteParameterAsync(Guid parameter);

    }
}
