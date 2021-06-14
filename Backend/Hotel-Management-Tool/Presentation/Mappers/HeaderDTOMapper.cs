using Hotel.Management.Tool.Core.Interfaces;
using Hotel.Management.Tool.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Hotel.Management.Tool.Presentation.Mappers
{
    public class HeaderDTOMapper : IHeaderDTOMapper
    {
        public HeaderDTO<Guid> HeaderMapper(Guid id)
        {
            return new HeaderDTO<Guid>
            {
                Data = id
            };
        }
    }
}
