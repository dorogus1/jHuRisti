// Models/OrderItem.cs
using System.ComponentModel.DataAnnotations;

public class OrderItem
{
    [Key]
    public int Id { get; set; }
    public int OrderId { get; set; }
    public int ProductId { get; set; }
    public int Quantity { get; set; }
    public decimal UnitPrice { get; set; }

    // Navigation properties
    public Order? Order { get; set; }
    public Storage? Product { get; set; }
}