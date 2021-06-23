using Hotel.Management.Tool.Core.Enums;
using System;
using System.Collections.Generic;

namespace Hotel.Management.Tool.Presentation.Mappers
{
    public class EnumMapper : BaseEnumMapper
    {
        public EnumMapper() : base(new Dictionary<Enum, string>
        {
            {ErrorCode.BadRequest, "BadRequest"},
            {ErrorCode.Conflict, "Conflict"},
            {ErrorCode.Forbidden, "Forbidden"},
            {ErrorCode.ItemExisted, "ItemExisted"},
            {ErrorCode.NotFound, "NotFound"},
            {ErrorCode.Unauthorized, "Unauthorized"},
            {ErrorCode.Other, "Other"},

            {Gender.MALE, "MALE"},
            {Gender.FEMALE, "FEMALE"},
            {Gender.UNKNOWN, "UNKNOWN"},

            {Role.ADMIN, "ADMIN"},
            {Role.STAFF, "STAFF"},

            {RoomStatus.OPEN, "OPEN"},
            {RoomStatus.CLOSE, "CLOSE"},
            {RoomStatus.REPAIRING, "REPAIRING"},

            {SortDirection.Ascending, "Ascending" },
            {SortDirection.Descending, "Descending" }
        })
        { }
    }
}
