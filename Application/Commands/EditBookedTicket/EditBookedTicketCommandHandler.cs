using Acceloka.Infrastructure.Persistence;
using Acceloka.Application.Commands.EditBookedTicket;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Acceloka.Application.Commands.EditBookedTicket
{
    public class EditBookedTicketCommandHandler
        : IRequestHandler<EditBookedTicketCommand,
            List<EditBookedTicketResultDto>>
    {
        private readonly AppDbContext _context;

        public EditBookedTicketCommandHandler(
            AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<EditBookedTicketResultDto>> Handle(
            EditBookedTicketCommand request,
            CancellationToken cancellationToken)
        {
            var bookedTickets = await _context.BookedTickets
                .Where(x => x.BookedTicketGroupId
                            == request.BookedTicketGroupId)
                .ToListAsync(cancellationToken);

            if (!bookedTickets.Any())
                throw new KeyNotFoundException(
                    $"BookedTicketId {request.BookedTicketGroupId} not found.");

            foreach (var item in request.Items)
            {
                if (item.Quantity < 1)
                    throw new ArgumentException(
                        "Quantity minimal 1.");

                var booked = bookedTickets
                    .FirstOrDefault(x => x.TicketCode == item.TicketCode);

                if (booked == null)
                    throw new KeyNotFoundException(
                        $"TicketCode {item.TicketCode} not found in booking.");

                var ticket = await _context.Tickets
                    .Include(t => t.Category)
                    .FirstOrDefaultAsync(
                        t => t.TicketCode == item.TicketCode,
                        cancellationToken);

                if (ticket == null)
                    throw new KeyNotFoundException(
                        $"TicketCode {item.TicketCode} not found.");

                if (item.Quantity > ticket.Quota)
                    throw new ArgumentException(
                        "Quantity exceeds ticket quota.");

                booked.Quantity = item.Quantity;
            }

            await _context.SaveChangesAsync(cancellationToken);

            var ticketCodes = bookedTickets
                .Select(x => x.TicketCode)
                .ToList();

            var tickets = await _context.Tickets
                .Include(t => t.Category)
                .Where(t => ticketCodes.Contains(t.TicketCode))
                .ToListAsync(cancellationToken);

            var result = bookedTickets
                .Join(tickets,
                    bt => bt.TicketCode,
                    t => t.TicketCode,
                    (bt, t) => new EditBookedTicketResultDto
                    {
                        TicketCode = t.TicketCode,
                        TicketName = t.TicketName,
                        Quantity = bt.Quantity,
                        CategoryName = t.Category.Name
                    })
                .ToList();

            return result;
        }
    }
}
