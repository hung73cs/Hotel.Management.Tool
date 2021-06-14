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

            {Gender.Male, "Male"},
            {Gender.Female, "Female"},
            {Gender.Unknown, "Unknown"},

            {Role.Admin, "Admin"},
            {Role.Staff, "Staff"},

            {RoomStatus.Open, "Open"},
            {RoomStatus.Close, "Close"},
            {RoomStatus.Repairing, "Repairing"},

            {SortDirection.Ascending, "Ascending" },
            {SortDirection.Descending, "Descending" }
        })
        { }
    }
}
