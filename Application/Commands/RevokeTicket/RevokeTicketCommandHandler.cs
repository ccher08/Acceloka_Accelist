using MediatR;
using Microsoft.EntityFrameworkCore;
using Acceloka.Infrastructure.Persistence;

namespace Acceloka.Application.Commands.RevokeTicket
{
    public class RevokeTicketCommandHandler
        : IRequestHandler<RevokeTicketCommand,
            List<RevokeTicketResultDto>>
    {
        private readonly AppDbContext _context;

        public RevokeTicketCommandHandler(
            AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<RevokeTicketResultDto>> Handle(
            RevokeTicketCommand request,
            CancellationToken cancellationToken)
        {
            if (request.Qty <= 0)
                throw new ArgumentException("Qty must be greater than 0.");

            var bookedTicket = await _context.BookedTickets
                .FirstOrDefaultAsync(x =>
                    x.BookedTicketGroupId == request.BookedTicketGroupId &&
                    x.TicketCode == request.TicketCode,
                    cancellationToken);

            if (bookedTicket == null)
                throw new KeyNotFoundException(
                    "BookedTicketId or TicketCode not found.");

            if (request.Qty > bookedTicket.Quantity)
                throw new ArgumentException(
                    "Qty cannot exceed booked quantity.");

            bookedTicket.Quantity -= request.Qty;

            if (bookedTicket.Quantity == 0)
            {
                _context.BookedTickets.Remove(bookedTicket);
            }

            await _context.SaveChangesAsync(cancellationToken);

            // Check if group has tickets
            var remainingGroup = await _context.BookedTickets
                .Where(x => x.BookedTicketGroupId
                            == request.BookedTicketGroupId)
                .ToListAsync(cancellationToken);

            if (!remainingGroup.Any())
            {
                // All tickets in group removed
            }

            var ticketCodes = remainingGroup
                .Select(x => x.TicketCode)
                .ToList();

            var tickets = await _context.Tickets
                .Include(t => t.Category)
                .Where(t => ticketCodes.Contains(t.TicketCode))
                .ToListAsync(cancellationToken);

            var result = remainingGroup
                .Join(tickets,
                    bt => bt.TicketCode,
                    t => t.TicketCode,
                    (bt, t) => new RevokeTicketResultDto
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
