namespace Acceloka.Application.Queries.GetAvailableTicket
{
    public class GetAvailableTicketResult
    {
        public List<GetAvailableTicketResponse> Tickets { get; set; } = new();
        public int TotalTickets { get; set; }
    }
}
