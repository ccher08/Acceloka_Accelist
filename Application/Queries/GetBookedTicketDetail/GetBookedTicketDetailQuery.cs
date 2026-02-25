using MediatR;

namespace Acceloka.Application.Queries.GetBookedTicketDetail
{
    public class GetBookedTicketDetailQuery
        : IRequest<List<GetBookedTicketDetailResultDto>>
    {
        public int BookedTicketGroupId { get; set; }

        public GetBookedTicketDetailQuery(int bookedTicketGroupId)
        {
            BookedTicketGroupId = bookedTicketGroupId;
        }
    }
}
