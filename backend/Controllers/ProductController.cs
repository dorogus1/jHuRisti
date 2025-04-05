// Controllers/ProductController.cs
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using System;
using System.IO;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
// Add these using directives at the top of your Startup.cs file
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
[ApiController]
[Route("api/product")]
public class ProductController : ControllerBase
{
    private readonly StorageDbContext _context;
    private readonly IWebHostEnvironment _environment;

    public ProductController(StorageDbContext context, IWebHostEnvironment environment)
    {
        _context = context;
        _environment = environment;
    }

    [HttpPost("add-product")]
    public async Task<IActionResult> AddProduct([FromForm] ProductViewModel model)
    {
        if (model == null)
        {
            return BadRequest("Invalid product data");
        }

        var product = new Storage
        {
            Name = model.Name,
            Description = model.Description,
            Size = model.Size,
            Type = model.Type,
            Stock = int.Parse(model.Stock),
            youtubeId = model.YoutubeId,
            Price = int.Parse(model.Price),
            IsDefault = false
        };

        // Process image if uploaded
        if (model.Image != null && model.Image.Length > 0)
        {
            // Fix: Handle null WebRootPath
            string uploadsFolder;
            if (string.IsNullOrEmpty(_environment.WebRootPath))
            {
                uploadsFolder = Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", "images");
            }
            else
            {
                uploadsFolder = Path.Combine(_environment.WebRootPath, "images");
            }

            if (!Directory.Exists(uploadsFolder))
            {
                Directory.CreateDirectory(uploadsFolder);
            }

            string uniqueFileName = Guid.NewGuid().ToString() + "_" + model.Image.FileName;
            string filePath = Path.Combine(uploadsFolder, uniqueFileName);

            using (var fileStream = new FileStream(filePath, FileMode.Create))
            {
                await model.Image.CopyToAsync(fileStream);
            }

            product.Image = $"/images/{uniqueFileName}";
        }

        _context.Products.Add(product);
        await _context.SaveChangesAsync();

        return Ok(new { message = "Product added successfully", productId = product.Id });
    }

    [HttpGet("products")]
    public async Task<IActionResult> GetProducts()
    {
        var products = await _context.Products.ToListAsync();
        return Ok(products);
    }
}

public class ProductViewModel
{
    public string Name { get; set; } = string.Empty;
    public string Description { get; set; } = string.Empty;
    public string Size { get; set; } = string.Empty;
    public string Type { get; set; } = string.Empty;
    public string Stock { get; set; } = string.Empty;
    public string YoutubeId { get; set; } = string.Empty;
    public string Price { get; set; } = string.Empty;
    public IFormFile? Image { get; set; }
}