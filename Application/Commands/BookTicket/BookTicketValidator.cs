using FluentValidation;

namespace Acceloka.Application.Commands.BookTicket
{
    public class BookTicketValidator
        : AbstractValidator<BookTicketCommand>
    {
        public BookTicketValidator()
        {
            RuleFor(x => x.Items)
                .NotNull().WithMessage("Items can't be null.")
                .NotEmpty().WithMessage("Items can't be empty.");

            RuleForEach(x => x.Items).ChildRules(items =>
            {
                items.RuleFor(i => i.TicketCode)
                    .NotEmpty().WithMessage("TicketCode is required.");

                items.RuleFor(i => i.Quantity)
                    .GreaterThan(0)
                    .WithMessage("Quantity must be greater than 0.");
            });

            RuleFor(x => x.Items)
                .Must(NoDuplicateTicketCodes)
                .WithMessage("Duplicate TicketCode detected.");
        }

        private bool NoDuplicateTicketCodes(
            List<BookTicketItemModel> items)
        {
            if (items == null) return true;

            return items
                .Select(x => x.TicketCode)
                .Distinct()
                .Count() == items.Count;
        }
    }
}
