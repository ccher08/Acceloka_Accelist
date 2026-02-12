namespace Acceloka.Application.Commands.BookTicket
{
    public class BookTicketResultDto
    {
        public decimal PriceSummary { get; set; }

        public List<TicketsPerCategoryDto> TicketsPerCategories { get; set; }
            = new List<TicketsPerCategoryDto>();
    }

    public class TicketsPerCategoryDto
    {
        public string CategoryName { get; set; } = string.Empty;

        public decimal SummaryPrice { get; set; }

        public List<TicketItemDto> Tickets { get; set; }
            = new List<TicketItemDto>();
    }

    public class TicketItemDto
    {
        public string TicketCode { get; set; } = string.Empty;

        public string TicketName { get; set; } = string.Empty;

        public decimal Price { get; set; }
    }

}
