using System;
using Hotel.Management.Tool.Core.Enums;

namespace Hotel.Management.Tool.Core.Exceptions
{
    public class ExtendException : Exception
    {
        public ExtendException() {}

        public ExtendException(string extendMessage, Exception innerException = null) {
            ExtendMessage = extendMessage;
        }
        public ExtendException(ErrorCode errorCode, string extendMessage, Exception innerException = null)
        {         
            ErrorCode = errorCode;
            ExtendMessage = extendMessage;
        }
        public string ExtendMessage { get; set; }
        public ErrorCode ErrorCode { get; set; }
    }
}
