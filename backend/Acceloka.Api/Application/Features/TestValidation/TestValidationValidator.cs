using FluentValidation;

public class TestValidationValidator : AbstractValidator<TestValidationQuery>
{
    public TestValidationValidator()
    {
        RuleFor(x => x.Name)
            .NotEmpty().WithMessage("Name can't be empty.");
    }
}
