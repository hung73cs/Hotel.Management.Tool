using System.Net;
using Newtonsoft.Json;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Diagnostics;
using Microsoft.AspNetCore.Http;
using Hotel.Management.Tool.Core.Enums;
using Hotel.Management.Tool.Models;

namespace Hotel.Management.Tool.Core.Exceptions
{
    public static class ExceptionMiddlewares
    {
        public static void ConfigExceptionHandler(this IApplicationBuilder app)
        {
            _ = app.UseExceptionHandler(appError =>
              {
                  appError.Run(async context =>
                  {
                      context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                      context.Response.ContentType = "application/json";

                      var contextFeature = context.Features.Get<IExceptionHandlerFeature>();

                      if (context != null)
                      {
                          string errorMessage;

                          if (contextFeature.Error is ExtendException extendException)
                          {
                              switch (extendException.ErrorCode)
                              {
                                  case ErrorCode.BadRequest:
                                      context.Response.StatusCode = (int)HttpStatusCode.BadRequest;
                                      errorMessage = extendException.ExtendMessage;
                                    break;
                                  case ErrorCode.Unauthorized:
                                      context.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                                      errorMessage = extendException.ExtendMessage;
                                      break;
                                  case ErrorCode.NotFound:
                                      context.Response.StatusCode = (int)HttpStatusCode.NotFound;
                                      errorMessage = extendException.ExtendMessage;
                                      break;
                                  case ErrorCode.Conflict:
                                      context.Response.StatusCode = (int)HttpStatusCode.Conflict;
                                      errorMessage = extendException.ExtendMessage;
                                      break;
                                  case ErrorCode.Forbidden:
                                      context.Response.StatusCode = (int)HttpStatusCode.Forbidden;
                                      errorMessage = extendException.ExtendMessage;
                                      break;
                                  default:
                                      context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                                      errorMessage = extendException.ExtendMessage;
                                      break;
                              }
                          }
                          else
                          {
                              context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;
                              errorMessage = "An error out of Extent Exception";
                          }

                          await context.Response.WriteAsync(JsonConvert.SerializeObject(new ErrorModel
                          {
                              Message = errorMessage
                          }));
                      }
                  });
              });
        }
               
    }
}
