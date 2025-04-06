// Models/OrderItem.cs
using System.ComponentModel.DataAnnotations;

public class OrderItem
{
    public int Id { get; set; }
    public int OrderId { get; set; }
    public int ProductId { get; set; }
    public string ProductName { get; set; } = string.Empty;
    public string Size { get; set; } = string.Empty;
    public string Type { get; set; } = string.Empty;
    public int Quantity { get; set; }
    public decimal Price { get; set; }
    public Order? Order { get; set; }
}
public class OrderViewModel
{
    public CustomerInfo CustomerInfo { get; set; } = new CustomerInfo();
    public List<OrderItemViewModel> Items { get; set; } = new List<OrderItemViewModel>();
    public decimal TotalAmount { get; set; }
}
public class CustomerInfo
{
    public string Name { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string Phone { get; set; } = string.Empty;
    public string Address { get; set; } = string.Empty;
    public string Location { get; set; } = string.Empty;
}

public class OrderItemViewModel
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Size { get; set; } = string.Empty;
    public string Type { get; set; } = string.Empty;
    public int Quantity { get; set; }
    public decimal Price { get; set; }
}