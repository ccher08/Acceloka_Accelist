using MediatR;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("api/v1/test")]
public class TestController : ControllerBase
{
    private readonly IMediator mediator;

    public TestController(IMediator mediator)
    {
        this.mediator = mediator;
    }

    [HttpGet]
    public async Task<IActionResult> Test([FromQuery] string name)
    {
        var result = await mediator.Send(new TestValidationQuery(name));
        return Ok(result);
    }
}
