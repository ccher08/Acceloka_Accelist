using MediatR;

namespace Acceloka.Application.Commands.RevokeTicket
{
    public class RevokeTicketCommand
        : IRequest<List<RevokeTicketResultDto>>
    {
        public int BookedTicketGroupId { get; set; }

        public string TicketCode { get; set; } = string.Empty;

        public int Qty { get; set; }

        public RevokeTicketCommand(
            int bookedTicketGroupId,
            string ticketCode,
            int qty)
        {
            BookedTicketGroupId = bookedTicketGroupId;
            TicketCode = ticketCode;
            Qty = qty;
        }
    }
}
