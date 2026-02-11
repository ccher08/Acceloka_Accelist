using Acceloka.Domain.Entities;
using Acceloka.Infrastructure.Persistence;
using Acceloka.Infrastructure.Repositories.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace Acceloka.Infrastructure.Repositories
{
    public class TicketRepository : ITicketRepository
    {
        private readonly AppDbContext _dbContext;

        public TicketRepository(AppDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<IQueryable<Ticket>> GetAvailableTicketsAsync()
        {
            return await Task.FromResult(
                _dbContext.Tickets
                    .Include(x => x.Category)
                    .Where(x => x.Quota > 0)
                    .AsQueryable());
        }

        public async Task<Ticket?> GetByTicketCodeAsync(string ticketCode)
        {
            return await _dbContext.Tickets
                .Include(x => x.Category)
                .FirstOrDefaultAsync(x => x.TicketCode == ticketCode);
        }

        public async Task UpdateAsync(Ticket ticket)
        {
            _dbContext.Tickets.Update(ticket);
            await _dbContext.SaveChangesAsync();
        }

    }
}
