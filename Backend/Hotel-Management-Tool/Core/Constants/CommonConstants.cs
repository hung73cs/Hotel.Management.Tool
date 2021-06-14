namespace Hotel.Management.Tool.Core.Constants
{
    public class CommonConstants
    {
        public static class ContentTypes
        {
            public const string ApplicationJson = "application/json";
        }

        public static class ErrorMessage
        {
            public const string ItemNotFound = "Item do not exist";
            public const string ItemExisted = "Name of item had existed";
            public const string WrongMapping = "Mapping is wronged";
        }
        public static class DateFormats
        {
            public const string GMTDateFormat = "ddd, dd MMM yyy HH':'mm':'ss 'GMT'";
            public const string ddMMyyyy = "dd/MM/yyyy";
        }
    }
}
