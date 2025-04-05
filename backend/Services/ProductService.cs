using Microsoft.EntityFrameworkCore;

public interface IProductService
{
    bool CheckProductAvailability(int productId);
}

public class ProductService : IProductService
{
    private readonly StorageDbContext _context;

    public ProductService(StorageDbContext context)
    {
        _context = context;
    }

    public bool CheckProductAvailability(int productId)
    {
        var product = _context.Products.Find(productId);
        return product != null && product.Stock > 0;
    }
}