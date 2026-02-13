using Acceloka.Application.Commands.EditBookedTicket;
using MediatR;

namespace Acceloka.Application.Commands.EditBookedTicket
{
    public class EditBookedTicketCommand
        : IRequest<List<EditBookedTicketResultDto>>
    {
        public int BookedTicketGroupId { get; set; }

        public List<EditTicketItemDto> Items { get; set; }
            = new List<EditTicketItemDto>();
    }

    public class EditTicketItemDto
    {
        public string TicketCode { get; set; } = string.Empty;

        public int Quantity { get; set; }
    }
}
