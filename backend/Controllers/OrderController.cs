// Controllers/OrderController.cs
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Linq;
using System.Threading.Tasks;

[ApiController]
[Route("api/orders")]
public class OrderController : ControllerBase
{
    private readonly StorageDbContext _context;
    private readonly EmailService _emailService;

    public OrderController(StorageDbContext context, EmailService emailService)
    {
        _context = context;
        _emailService = emailService;
    }

    [HttpPost]
    public async Task<IActionResult> PlaceOrder([FromBody] OrderViewModel model)
    {
        if (model == null || model.CustomerInfo == null || model.Items == null || !model.Items.Any())
        {
            return BadRequest("Invalid order data");
        }

        // Create new order
        var order = new Order
        {
            Name = model.CustomerInfo.Name,
            Email = model.CustomerInfo.Email,
            Phone = model.CustomerInfo.Phone,
            Address = model.CustomerInfo.Address,
            Location = model.CustomerInfo.Location,
            TotalAmount = model.TotalAmount,
            OrderDate = DateTime.UtcNow,
            Status = "Pending"
        };

        // Add items to order
        foreach (var item in model.Items)
        {
            var product = await _context.Products.FindAsync(item.Id);
            if (product == null)
            {
                return BadRequest($"Product with ID {item.Id} not found");
            }

            if (product.Stock < item.Quantity)
            {
                return BadRequest($"Not enough stock for {product.Name}. Only {product.Stock} available.");
            }

            order.Items.Add(new OrderItem
            {
                ProductId = product.Id,
                ProductName = item.Name,
                Size = item.Size,
                Type = item.Type,
                Quantity = item.Quantity,
                Price = (decimal)product.Price
            });

            // Update product stock
            product.Stock -= item.Quantity;
        }

        // Save order to database
        _context.Orders.Add(order);
        await _context.SaveChangesAsync();

        // Send confirmation email
        try
        {
            await _emailService.SendOrderConfirmationAsync(order.Email, order);
        }
        catch (Exception ex)
        {
            // Log the error but don't fail the order
            Console.WriteLine($"Failed to send order confirmation email: {ex.Message}");
        }

        return Ok(new {
            orderId = order.Id,
            message = "Order placed successfully. An email confirmation has been sent."
        });
    }

    [HttpGet("{id}")]
    public async Task<IActionResult> GetOrder(int id)
    {
        var order = await _context.Orders
            .Include(o => o.Items)
            .FirstOrDefaultAsync(o => o.Id == id);

        if (order == null)
        {
            return NotFound($"Order with ID {id} not found");
        }

        return Ok(order);
    }
}