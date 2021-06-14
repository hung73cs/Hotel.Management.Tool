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

            {Gender.MALE, "Male"},
            {Gender.FEMALE, "Female"},
            {Gender.UNKNOWN, "Unknown"},

            {Role.ADMIN, "ADMIN"},
            {Role.STAFF, "Staff"},

            {RoomStatus.OPEN, "Open"},
            {RoomStatus.CLOSE, "Close"},
            {RoomStatus.REPAIRING, "Repairing"},

            {SortDirection.Ascending, "Ascending" },
            {SortDirection.Descending, "Descending" }
        })
        { }
    }
}
