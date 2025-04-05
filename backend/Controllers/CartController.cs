// CartController.cs
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Threading.Tasks;

[ApiController]
[Route("api/[controller]")]
public class CartController : ControllerBase
{
    private readonly StorageDbContext _context;

    public CartController(StorageDbContext context)
    {
        _context = context;
    }

    [HttpPost("add")]
    public async Task<IActionResult> AddToCart([FromBody] CartItemModel item)
    {
        if (item == null || item.Quantity <= 0)
        {
            return BadRequest("Invalid cart item data");
        }

        // Find product by ID
        var product = await _context.Products.FindAsync(item.Id);

        if (product == null)
        {
            return NotFound($"Product with ID {item.Id} not found");
        }

        // Check if enough stock is available
        if (product.Stock < item.Quantity)
        {
            return BadRequest($"Not enough stock available. Only {product.Stock} units left.");
        }

        // Update stock (reduce by quantity purchased)
        product.Stock -= item.Quantity;
        await _context.SaveChangesAsync();

        return Ok(new {
            message = "Checkout successful",
            productId = item.Id,
            updatedStock = product.Stock
        });
    }

    [HttpGet("check-availability/{id}")]
    public async Task<IActionResult> CheckAvailability(int id)
    {
        var product = await _context.Products.FindAsync(id);

        if (product == null)
        {
            return NotFound($"Product with ID {id} not found");
        }

        return Ok(new {
            available = product.Stock > 0,
            stock = product.Stock
        });
    }
}