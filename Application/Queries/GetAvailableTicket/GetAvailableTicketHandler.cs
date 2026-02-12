using Acceloka.Infrastructure.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace Acceloka.Application.Queries.GetAvailableTicket
{

    public class GetAvailableTicketHandler
        : IRequestHandler<GetAvailableTicketQuery, GetAvailableTicketResult>
    {
        private readonly AppDbContext appDbContext;

        public GetAvailableTicketHandler(AppDbContext appDbContext)
        {
            this.appDbContext = appDbContext;
        }

        public async Task<GetAvailableTicketResult> Handle(
            GetAvailableTicketQuery request,
            CancellationToken cancellationToken)
        {
            var query = appDbContext.Tickets
                .Include(x => x.Category)
                .Where(x => x.Quota > 0)
                .AsQueryable();

            // Filtering
            if (!string.IsNullOrWhiteSpace(request.CategoryName))
            {
                query = query.Where(x =>
                    x.Category.Name.Contains(request.CategoryName));
            }

            if (!string.IsNullOrWhiteSpace(request.TicketCode))
            {
                query = query.Where(x =>
                    x.TicketCode.Contains(request.TicketCode));
            }

            if (!string.IsNullOrWhiteSpace(request.TicketName))
            {
                query = query.Where(x =>
                    x.TicketName.Contains(request.TicketName));
            }

            if (request.Price.HasValue)
            {
                query = query.Where(x =>
                    x.Price <= request.Price.Value);
            }

            if (request.EventDateStart.HasValue)
            {
                query = query.Where(x =>
                    x.EventDate >= request.EventDateStart.Value);
            }

            if (request.EventDateEnd.HasValue)
            {
                query = query.Where(x =>
                    x.EventDate <= request.EventDateEnd.Value);
            }

            // Sorting
            var orderBy = request.OrderBy?.ToLower();
            var orderState = request.OrderState?.ToLower() ?? "asc";

            if (string.IsNullOrWhiteSpace(orderBy))
            {
                // Default --> EventDate DESC, Price ASC
                query = query
                    .OrderByDescending(x => x.EventDate)
                    .ThenBy(x => x.Price);
            }
            else
            {
                query = orderBy switch
                {
                    "categoryname" => orderState == "desc"
                        ? query.OrderByDescending(x => x.Category.Name)
                        : query.OrderBy(x => x.Category.Name),

                    "ticketcode" => orderState == "desc"
                        ? query.OrderByDescending(x => x.TicketCode)
                        : query.OrderBy(x => x.TicketCode),

                    "ticketname" => orderState == "desc"
                        ? query.OrderByDescending(x => x.TicketName)
                        : query.OrderBy(x => x.TicketName),

                    "price" => orderState == "desc"
                        ? query.OrderByDescending(x => x.Price)
                        : query.OrderBy(x => x.Price),

                    "eventdate" => orderState == "desc"
                        ? query.OrderByDescending(x => x.EventDate)
                        : query.OrderBy(x => x.EventDate),

                    "remainingquota" => orderState == "desc"
                        ? query.OrderByDescending(x => x.Quota)
                        : query.OrderBy(x => x.Quota),

                    _ => query
                        .OrderByDescending(x => x.EventDate)
                        .ThenBy(x => x.Price)
                };
            }


            // Page (10 per page)
            var totalTickets = await query.CountAsync(cancellationToken);

            var tickets = await query
                .Skip((request.Page - 1) * 10)
                .Take(10)
                .Select(x => new GetAvailableTicketResponse
                {
                    CategoryName = x.Category.Name,
                    TicketCode = x.TicketCode,
                    TicketName = x.TicketName,
                    EventDate = x.EventDate,
                    Price = x.Price,
                    RemainingQuota = x.Quota
                })
                .ToListAsync(cancellationToken);

            return new GetAvailableTicketResult
            {
                Tickets = tickets,
                TotalTickets = totalTickets
            };
        }
    }
}