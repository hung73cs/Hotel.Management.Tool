using System;

namespace Hotel.Management.Tool.Core.Entities
{
    public class Base
    {
        public Guid Id { get; set; }
        public bool IsDeleted { get; set; }
    }
}
