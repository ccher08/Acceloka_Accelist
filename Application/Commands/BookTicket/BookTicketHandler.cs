using Acceloka.Application.Exceptions;
using Acceloka.Common.Errors;
using Acceloka.Domain.Entities;
using Acceloka.Infrastructure.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Acceloka.Application.Commands.BookTicket
{
    public class BookTicketCommandHandler
       : IRequestHandler<BookTicketCommand, BookTicketResultDto>
    {
        private readonly AppDbContext _context;

        public BookTicketCommandHandler(AppDbContext context)
        {
            _context = context;
        }

        public async Task<BookTicketResultDto> Handle(
            BookTicketCommand request,
            CancellationToken cancellationToken)
        {
            var ticketCodes = request.Items
                .Select(x => x.TicketCode)
                .Distinct()
                .ToList();

            var tickets = await _context.Tickets
                .Include(t => t.Category)
                .Where(t => ticketCodes.Contains(t.TicketCode))
                .ToListAsync(cancellationToken);

            
            // VALIDATION

            if (tickets.Count != ticketCodes.Count)
                throw new BadRequestException("One or more TicketCode not found.");

            foreach (var item in request.Items)
            {
                var ticket = tickets.First(t => t.TicketCode == item.TicketCode);

                if (ticket.Quota <= 0)
                    throw new BadRequestException(
                        $"Ticket {ticket.TicketCode} quota is sold out.");

                if (item.Quantity > ticket.Quota)
                    throw new BadRequestException(
                        $"Ticket {ticket.TicketCode} quantity exceeds remaining quota.");

                 if (ticket.EventDate <= DateTime.UtcNow)
                    throw new BadRequestException(
                        $"Ticket {ticket.TicketCode} event date has passed.");
            }

            // SAVE TO BookedTicket TABLE

            foreach (var item in request.Items)
            {
                var ticket = tickets.First(t => t.TicketCode == item.TicketCode);

                // Kurangi quota
                ticket.Quota -= item.Quantity;

                // Insert ke BookedTicket
                var bookedTicket = new BookedTicket
                {
                    TicketCode = ticket.TicketCode,
                    Quantity = item.Quantity,
                    BookingDate = DateTime.UtcNow
                };

                _context.BookedTickets.Add(bookedTicket);
            }

            await _context.SaveChangesAsync(cancellationToken);


            // GROUPING & RESULT BUILDING
            var groupedTickets = tickets
                .Select(ticket =>
                {
                    var quantity = request.Items
                        .First(x => x.TicketCode == ticket.TicketCode)
                        .Quantity;

                    return new
                    {
                        CategoryName = ticket.Category.Name,
                        TicketCode = ticket.TicketCode,
                        TicketName = ticket.TicketName,
                        ticket.Price,
                        Quantity = quantity,
                        SubTotal = ticket.Price * quantity
                    };
                })
                .GroupBy(x => x.CategoryName)
                .ToList();

            var result = new BookTicketResultDto();

            foreach (var categoryGroup in groupedTickets)
            {
                var categoryDto = new TicketsPerCategoryDto
                {
                    CategoryName = categoryGroup.Key,
                    SummaryPrice = categoryGroup.Sum(x => x.SubTotal)
                };

                foreach (var ticket in categoryGroup)
                {
                    categoryDto.Tickets.Add(new TicketItemDto
                    {
                        TicketCode = ticket.TicketCode,
                        TicketName = ticket.TicketName,
                        Price = ticket.Price
                    });
                }

                result.TicketsPerCategories.Add(categoryDto);
            }

            result.PriceSummary = result.TicketsPerCategories
                .Sum(x => x.SummaryPrice);

            return result;
        }
    }
}
