namespace Acceloka.Application.Queries.GetBookedTicketDetail
{
    public class GetBookedTicketDetailResultDto
    {
        public int QtyPerCategory { get; set; }

        public string CategoryName { get; set; } = string.Empty;

        public List<TicketDetailDto> Tickets { get; set; }
            = new List<TicketDetailDto>();
    }

    public class TicketDetailDto
    {
        public string TicketCode { get; set; } = string.Empty;

        public string TicketName { get; set; } = string.Empty;

        public string EventDate { get; set; } = string.Empty;
    }
}
