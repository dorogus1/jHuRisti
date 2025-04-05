using Microsoft.EntityFrameworkCore;

public class StorageDbContext : DbContext
{
    public StorageDbContext(DbContextOptions<StorageDbContext> options)
        : base(options)
    {
    }

    public DbSet<Storage> Products { get; set; } = null!;
}