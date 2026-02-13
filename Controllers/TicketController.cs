using Acceloka.Application.Commands.BookTicket;
using Acceloka.Application.Commands.EditBookedTicket;
using Acceloka.Application.Commands.RevokeTicket;
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




    [HttpDelete("revoke-ticket/{bookedTicketGroupId}/{ticketCode}/{qty}")]
    public async Task<IActionResult> RevokeTicket(
    int bookedTicketGroupId,
    string ticketCode,
    int qty)
    {
        var result = await mediator.Send(
            new RevokeTicketCommand(
                bookedTicketGroupId,
                ticketCode,
                qty));

        return Ok(result);
    }




    [HttpPut("edit-booked-ticket/{bookedTicketGroupId}")]
    public async Task<IActionResult> EditBookedTicket(
    int bookedTicketGroupId,
    [FromBody] EditBookedTicketCommand command)
    {
        command.BookedTicketGroupId = bookedTicketGroupId;

        var result = await mediator.Send(command);

        return Ok(result);
    }


}
