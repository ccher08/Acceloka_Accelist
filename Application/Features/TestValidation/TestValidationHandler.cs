using MediatR;

public class TestValidationHandler : IRequestHandler<TestValidationQuery, string>
{
    public Task<string> Handle(TestValidationQuery request, CancellationToken cancellationToken)
    {
        return Task.FromResult($"Hello {request.Name}");
    }
}
