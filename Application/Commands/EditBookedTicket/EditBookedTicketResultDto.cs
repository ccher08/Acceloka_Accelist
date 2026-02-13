namespace Acceloka.Application.Commands.EditBookedTicket
{
    public class EditBookedTicketResultDto
    {
        public string TicketCode { get; set; } = string.Empty;

        public string TicketName { get; set; } = string.Empty;

        public int Quantity { get; set; }

        public string CategoryName { get; set; } = string.Empty;
    }
}
