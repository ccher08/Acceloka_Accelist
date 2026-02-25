### Acceloka
```text
│
├── Application
│   ├── Commands
│   │   ├── BookTicket
│   │   │   ├── BookTicketCommand.cs
│   │   │   ├── BookTicketHandler.cs
│   │   │   ├── BookTicketItemModel.cs
│   │   │   ├── BookTicketResultDto.cs
│   │   │   └── BookTicketValidator.cs
│   │   ├── EditBookedTicket
│   │   │   ├── EditBookedTicketCommand.cs
│   │   │   ├── EditBookedTicketCommandHandler.cs
│   │   │   └── EditBookedTicketResultDto.cs
│   │   └── RevokeTicket
│   │       ├── RevokeTicketCommand.cs
│   │       ├── RevokeTicketCommandHandler.cs
│   │       └── RevokeTicketResultDto.cs
│   ├── Exceptions
│   │   └── BadRequestException.cs
│   ├── Features
│   │   └── TestValidation
│   │       ├── TestValidationHandler.cs
│   │       ├── TestValidationQuery.cs
│   │       └── TestValidationValidator.cs
│   └── Queries
│       ├── GetAvailableTicket
│       │   ├── GetAvailableTicketHandler.cs
│       │   ├── GetAvailableTicketQuery.cs
│       │   ├── GetAvailableTicketResponse.cs
│       │   ├── GetAvailableTicketResult.cs
│       │   └── GetAvailableTicketValidator.cs
│       └── GetBookedTicketDetail
│           ├── GetBookedTicketDetailQuery.cs
│           ├── GetBookedTicketDetailQueryHandler.cs
│           └── GetBookedTicketDetailResultDto.cs
├── Common
│   └── Errors
│       ├── GlobalExceptionMiddleware.cs
│       └── ProblemDetailsFactory.cs
├── Controllers
│   ├── TestController.cs
│   └── TicketController.cs
├── Domain
│   └── Entities
│       ├── BookedTicket.cs
│       ├── Category.cs
│       └── Ticket.cs
├── Infrastructure
│   ├── Persistence
│   │   └── AppDbContext.cs
│   └── Repositories
│       ├── Interfaces
│       │   └── ITicketRepository.cs
│       └── TicketRepository.cs
└── Migrations
```

///////////////////////////////////////

# 1. GET Available Ticket
GET /api/v1/get-available-ticket
Query Params
- CategoryName
- TicketCode
- TicketName
- Price (<=)
- EventDateStart
- EventDateEnd
- OrderBy (default `TicketCode`)
- OrderState (`asc` / `desc`)

# 2. POST Booking Ticket
POST /api/v1/book-ticket

# 3. GET Booked Ticket Detail
GET /api/v1/get-booked-ticket/{BookedTicketId}

# 4. DELETE Revoke Ticket
DELETE /api/v1/revoke-ticket/{BookedTicketId}/{TicketCode}/{Qty}

# 5. PUT Edit Booked Ticket
PUT /api/v1/edit-booked-ticket/{BookedTicketId}

