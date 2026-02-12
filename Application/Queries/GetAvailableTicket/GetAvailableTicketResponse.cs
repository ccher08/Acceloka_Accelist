
namespace Acceloka.Application.Queries.GetAvailableTicket
{
    public class GetAvailableTicketResponse
    {
        public string CategoryName { get; set; } = string.Empty;
        public string TicketCode { get; set; } = string.Empty;
        public string TicketName { get; set; } = string.Empty;
        public DateTime EventDate { get; set; }
        public decimal Price { get; set; }
        public int RemainingQuota { get; set; }
    }
}