using Acceloka.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace Acceloka.Infrastructure.Persistence
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<Category> Categories { get; set; } = null!;
        public DbSet<Ticket> Tickets { get; set; } = null!;
        public DbSet<BookedTicket> BookedTickets { get; set; } = null!;

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Category>(entity =>
            {
                entity.HasKey(x => x.Id);

                entity.Property(x => x.Name)
                    .IsRequired()
                    .HasMaxLength(100);
            });

            modelBuilder.Entity<Ticket>(entity =>
            {
                entity.HasKey(x => x.Id);

                entity.Property(x => x.TicketCode)
                    .IsRequired()
                    .HasMaxLength(50);

                entity.Property(x => x.TicketName)
                    .IsRequired()
                    .HasMaxLength(200);

                entity.Property(x => x.Price)
                    .HasColumnType("decimal(18,2)");

                entity.HasOne(x => x.Category)
                    .WithMany(x => x.Tickets)
                    .HasForeignKey(x => x.CategoryId);
            });

            modelBuilder.Entity<BookedTicket>(entity =>
            {
                entity.HasKey(x => x.Id);

                entity.Property(x => x.TicketCode)
                    .IsRequired()
                    .HasMaxLength(50);
            });
        }
    }
}
