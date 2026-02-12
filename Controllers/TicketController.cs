using Acceloka.Application.Commands.BookTicket;
using Acceloka.Application.Queries.GetAvailableTicket;
using Acceloka.Application.Queries.GetBookedTicketDetail;
using MediatR;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/v1")]
public class TicketController : ControllerBase
{
    private readonly IMediator mediator;

    public TicketController(IMediator mediator)
    {
        this.mediator = mediator;
    }

    [HttpGet("get-available-ticket")]
    public async Task<IActionResult> GetAvailableTicket(
        [FromQuery] GetAvailableTicketQuery query)
    {
        var result = await mediator.Send(query);

        return Ok(result);
    }

    [HttpPost("book-ticket")]
    public async Task<IActionResult> BookTicket(
    [FromBody] BookTicketCommand command)
    {
        var result = await mediator.Send(command);

        return Ok(result);
    }

    [HttpGet("get-booked-ticket/{bookedTicketGroupId}")]
    public async Task<IActionResult> GetBookedTicketDetail(
    int bookedTicketGroupId)
    {
        var result = await mediator.Send(
            new GetBookedTicketDetailQuery(bookedTicketGroupId));

        return Ok(result);
    }

}
