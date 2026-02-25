using System.Net;
using System.Text.Json;
using Acceloka.Application.Exceptions;

namespace Acceloka.Common.Errors
{
    public class GlobalExceptionMiddleware
    {
        private readonly RequestDelegate _next;

        public GlobalExceptionMiddleware(RequestDelegate next)
        {
            _next = next;
        }

        public async Task InvokeAsync(HttpContext context)
        {
            try
            {
                await _next(context);
            }
            catch (BadRequestException ex)
            {
                context.Response.ContentType = "application/problem+json";
                context.Response.StatusCode = (int)HttpStatusCode.BadRequest;

                var problem = new
                {
                    type = "https://httpstatuses.com/400",
                    title = "Bad Request",
                    status = 400,
                    detail = ex.Message,
                    instance = context.Request.Path
                };

                await context.Response.WriteAsync(
                    JsonSerializer.Serialize(problem));
            }
            catch (Exception ex)
            {
                context.Response.ContentType = "application/problem+json";
                context.Response.StatusCode = (int)HttpStatusCode.InternalServerError;

                var problem = new
                {
                    type = "https://httpstatuses.com/500",
                    title = "Internal Server Error",
                    status = 500,
                    detail = ex.Message,
                    instance = context.Request.Path
                };

                await context.Response.WriteAsync(
                    JsonSerializer.Serialize(problem));
            }
        }
    }
}
