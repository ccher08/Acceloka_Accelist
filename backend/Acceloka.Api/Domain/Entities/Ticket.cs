using Acceloka.Domain.Entities;

namespace Acceloka.Domain.Entities
{
    public class Ticket
    {
        public int Id { get; set; }

        public int CategoryId { get; set; }

        public string TicketCode { get; set; } = string.Empty;

        public string TicketName { get; set; } = string.Empty;

        public DateTime EventDate { get; set; }

        public decimal Price { get; set; }

        public int Quota { get; set; }

        public Category Category { get; set; } = null!;
    }
}
