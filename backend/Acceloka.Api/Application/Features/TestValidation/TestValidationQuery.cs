using MediatR;

public record TestValidationQuery(string Name) : IRequest<string>;
