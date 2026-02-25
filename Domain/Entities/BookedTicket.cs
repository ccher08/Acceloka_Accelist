namespace Acceloka.Domain.Entities
{
    public class BookedTicket
    {
        public int Id { get; set; }

        public int BookedTicketGroupId { get; set; }

        public string TicketCode { get; set; } = string.Empty;

        public int Quantity { get; set; }

        public DateTime BookingDate { get; set; }
    }
}
