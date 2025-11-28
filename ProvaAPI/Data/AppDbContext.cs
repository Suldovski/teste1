using Microsoft.EntityFrameworkCore;
using ProvaAPI.Models;

namespace ProvaAPI.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<Entrega> Entregas => Set<Entrega>();

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Entrega>(e =>
        {
            e.ToTable("Entregas");
            e.HasKey(x => x.Id);
            e.Property(x => x.Produto).IsRequired();
            e.Property(x => x.Endereco).IsRequired();
            e.Property(x => x.Status).IsRequired();
        });
    }
}
