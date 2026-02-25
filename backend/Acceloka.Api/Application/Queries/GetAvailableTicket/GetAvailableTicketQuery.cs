using MediatR;

namespace Acceloka.Application.Queries.GetAvailableTicket
{
    public record GetAvailableTicketQuery(
        string? CategoryName,
        string? TicketCode,
        string? TicketName,
        decimal? Price,
        DateTime? EventDateStart,
        DateTime? EventDateEnd,
        string? OrderBy,
        string? OrderState,
        int Page = 1
    ) : IRequest<GetAvailableTicketResult>;
}