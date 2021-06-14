using System;

namespace Hotel.Management.Tool.Presentation.Mappers
{
    public interface IEnumMapper
    {
        string Map(Enum key);
        T? Map<T>(string value) where T : struct, IConvertible;
    }
}
