using MediatR;

namespace Acceloka.Application.Commands.BookTicket
{
    public class BookTicketCommand : IRequest<BookTicketResultDto>
    {
        public List<BookTicketItemModel> Items { get; set; }
            = new List<BookTicketItemModel>();
    }
}
