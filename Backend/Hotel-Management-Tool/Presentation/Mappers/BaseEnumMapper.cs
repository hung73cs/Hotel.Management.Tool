using System;
using System.Collections.Generic;
using System.Linq;

namespace Hotel.Management.Tool.Presentation.Mappers
{
    public class BaseEnumMapper : IEnumMapper
    {
        private readonly Dictionary<Enum, string> _mapper;

        protected BaseEnumMapper(Dictionary<Enum, string> enumDict)
        {
            _mapper = enumDict;
        }

        public virtual string Map(Enum key)
        {
            if (key != null && _mapper.ContainsKey(key))
                return _mapper.GetValueOrDefault(key);

            return null;
        }

        public virtual T? Map<T>(string value) where T : struct, IConvertible
        {
            if (value != null)
            {
                var kvp = _mapper.FirstOrDefault(x => x.Value == value);
                var stringToParse = !kvp.Equals(default) ? kvp.Key?.ToString() : "";

                if (!string.IsNullOrWhiteSpace(stringToParse))
                {
                    Enum.TryParse(stringToParse, out T result);

                    return result;
                }
            }

            return null;
        }
    }
}
