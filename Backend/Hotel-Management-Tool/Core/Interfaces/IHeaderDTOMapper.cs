using Hotel.Management.Tool.Models;
using System;
using System.Threading.Tasks;

namespace Hotel.Management.Tool.Core.Interfaces
{
    public interface IHeaderDTOMapper
    {
        HeaderDTO<Guid> HeaderMapper(Guid id);
    }
}
