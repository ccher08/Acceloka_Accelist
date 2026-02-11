using Acceloka.Domain.Entities;

namespace Acceloka.Infrastructure.Repositories.Interfaces
{
    public interface ITicketRepository
    {
        Task<IQueryable<Ticket>> GetAvailableTicketsAsync();

        Task<Ticket?> GetByTicketCodeAsync(string ticketCode);

        Task UpdateAsync(Ticket ticket);
    }
}
