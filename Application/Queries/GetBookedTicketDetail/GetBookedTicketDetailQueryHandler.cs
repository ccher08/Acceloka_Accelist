using MediatR;
using Microsoft.EntityFrameworkCore;
using Acceloka.Infrastructure.Persistence;

namespace Acceloka.Application.Queries.GetBookedTicketDetail
{
    public class GetBookedTicketDetailQueryHandler
        : IRequestHandler<GetBookedTicketDetailQuery,
            List<GetBookedTicketDetailResultDto>>
    {
        private readonly AppDbContext _context;

        public GetBookedTicketDetailQueryHandler(
            AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<GetBookedTicketDetailResultDto>> Handle(
            GetBookedTicketDetailQuery request,
            CancellationToken cancellationToken)
        {
            var bookedTickets = await _context.BookedTickets
                .Where(x => x.BookedTicketGroupId
                            == request.BookedTicketGroupId)
                .ToListAsync(cancellationToken);

            if (!bookedTickets.Any())
            {
                throw new KeyNotFoundException(
                    $"BookedTicketGroupId {request.BookedTicketGroupId} not found.");
            }

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
                    (bt, t) => new
                    {
                        bt.Quantity,
                        t.TicketCode,
                        t.TicketName,
                        t.EventDate,
                        CategoryName = t.Category.Name
                    })
                .GroupBy(x => x.CategoryName)
                .Select(g => new GetBookedTicketDetailResultDto
                {
                    CategoryName = g.Key,
                    QtyPerCategory = g.Sum(x => x.Quantity),
                    Tickets = g.Select(x => new TicketDetailDto
                    {
                        TicketCode = x.TicketCode,
                        TicketName = x.TicketName,
                        EventDate = x.EventDate
                            .ToString("dd-MM-yyyy HH:mm")
                    }).ToList()
                })
                .ToList();

            return result;
        }
    }
}
