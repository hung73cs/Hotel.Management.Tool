using Hotel.Management.Tool.Models;
using System;

namespace Hotel.Management.Tool.Core.Interfaces
{
    public interface IHeaderDTOMapper
    {
        HeaderDTO<Guid> HeaderMapper(Guid id);
    }
}
