using FluentValidation;

namespace Acceloka.Application.Queries.GetAvailableTicket
{
    public class GetAvailableTicketValidator : AbstractValidator<GetAvailableTicketQuery>
    {
        public GetAvailableTicketValidator()
        {
            RuleFor(x => x.Page)
                .GreaterThan(0);

            RuleFor(x => x.OrderState)
                .Must(x => x == null || x.ToLower() == "asc" || x.ToLower() == "desc")
                .WithMessage("OrderState must be ascending or descending.");
        }
    }
}