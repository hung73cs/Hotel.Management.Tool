using Hotel.Management.Tool.Core.Constants;
using Hotel.Management.Tool.Models;
using Microsoft.AspNetCore.Http;
using System;

namespace Hotel.Management.Tool.Presentation.Extensions
{
    public static class AddToHeaderResponse
    {
        public static void AddInfoHeaders(this HttpResponse response, Guid id)
        {

            response.Headers.Add("ID", id.ToString());
        }
    }
}
