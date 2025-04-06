using MailKit.Net.Smtp;
using MimeKit;
using System.Threading.Tasks;
using dotenv.net;

public class EmailService
{
    private readonly string _smtpServer = "smtp.office365.com";
    private readonly int _smtpPort = 587;
    private readonly string _smtpUser = Environment.GetEnvironmentVariable("SMTP_USER") ?? throw new InvalidOperationException("SMTP_USER environment variable is not set.");
    private readonly string _smtpPass = Environment.GetEnvironmentVariable("SMTP_PASS") ?? throw new InvalidOperationException("SMTP_PASS environment variable is not set.");


    public async Task SendVerificationEmailAsync(string recipientEmail, string verificationCode)
    {
        if (string.IsNullOrEmpty(_smtpUser) || string.IsNullOrEmpty(_smtpPass))
        {
            throw new InvalidOperationException("SMTP_USER or SMTP_PASS environment variables are not set.");
        }

        var message = new MimeMessage();
        message.From.Add(new MailboxAddress("jHuRisti", _smtpUser));
        message.To.Add(new MailboxAddress("", recipientEmail));
        message.Subject = "Email Verification";

        message.Body = new TextPart("plain")
        {
            Text = $"Verification code: {verificationCode}"
        };

        using var client = new SmtpClient();
        try
        {
            await client.ConnectAsync(_smtpServer, _smtpPort, MailKit.Security.SecureSocketOptions.StartTls);
            await client.AuthenticateAsync(_smtpUser, _smtpPass);
            await client.SendAsync(message);
        }
        finally
        {
            await client.DisconnectAsync(true);
        }
    }

    public async Task SendAuthAsync(string recipientEmail, string verificationCode)
    {
        if (string.IsNullOrEmpty(_smtpUser) || string.IsNullOrEmpty(_smtpPass))
        {
            throw new InvalidOperationException("SMTP_USER or SMTP_PASS environment variables are not set.");
        }

        var message = new MimeMessage();
        message.From.Add(new MailboxAddress("jHuRisti", _smtpUser));
        message.To.Add(new MailboxAddress("", recipientEmail));
        message.Subject = "Auth Verification";

        message.Body = new TextPart("plain")
        {
            Text = $"Verification code: {verificationCode}"
        };

        using var client = new SmtpClient();
        try
        {
            await client.ConnectAsync(_smtpServer, _smtpPort, MailKit.Security.SecureSocketOptions.StartTls);
            await client.AuthenticateAsync(_smtpUser, _smtpPass);
            await client.SendAsync(message);
        }
        finally
        {
            await client.DisconnectAsync(true);
        }
    }
    // Services/EmailService.cs - Add this method
    public async Task SendOrderConfirmationAsync(string recipientEmail, Order order)
    {
        if (string.IsNullOrEmpty(_smtpUser) || string.IsNullOrEmpty(_smtpPass))
        {
            throw new InvalidOperationException("SMTP_USER or SMTP_PASS environment variables are not set.");
        }

        var message = new MimeMessage();
        message.From.Add(new MailboxAddress("jHuRisti", _smtpUser));
        message.To.Add(new MailboxAddress("", recipientEmail));
        message.Subject = $"Order Confirmation #{order.Id}";

        var bodyBuilder = new BodyBuilder();

        // Create HTML table for order items
        var itemsTable = "<table border='1' cellpadding='5' style='border-collapse: collapse; width: 100%;'>" +
                        "<tr style='background-color: #f2f2f2;'>" +
                        "<th>Product</th><th>Size</th><th>Type</th><th>Quantity</th><th>Price</th><th>Total</th>" +
                        "</tr>";

        foreach (var item in order.Items)
        {
            itemsTable += $"<tr>" +
                          $"<td>{item.ProductName}</td>" +
                          $"<td>{item.Size}</td>" +
                          $"<td>{item.Type}</td>" +
                          $"<td>{item.Quantity}</td>" +
                          $"<td>${item.Price.ToString("F2")}</td>" +
                          $"<td>${(item.Price * item.Quantity).ToString("F2")}</td>" +
                          $"</tr>";
        }

        itemsTable += "</table>";

        bodyBuilder.HtmlBody = $@"
            <div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;'>
                <h1 style='color: #333; text-align: center;'>Order Confirmation</h1>
                <p>Dear {order.Name},</p>
                <p>Thank you for your order! We've received your purchase and are processing it now.</p>

                <h2>Order Details:</h2>
                <p><strong>Order Number:</strong> {order.Id}</p>
                <p><strong>Order Date:</strong> {order.OrderDate.ToString("yyyy-MM-dd HH:mm")}</p>
                <p><strong>Total Amount:</strong> ${order.TotalAmount.ToString("F2")}</p>

                <h2>Shipping Information:</h2>
                <p><strong>Name:</strong> {order.Name}</p>
                <p><strong>Address:</strong> {order.Address}</p>
                <p><strong>City/Location:</strong> {order.Location}</p>
                <p><strong>Phone:</strong> {order.Phone}</p>

                <h2>Order Items:</h2>
                {itemsTable}

                <p style='margin-top: 20px;'>If you have any questions about your order, please contact us.</p>
                <p>Thank you for shopping with jHuRisti!</p>
            </div>
        ";

        message.Body = bodyBuilder.ToMessageBody();

        using var client = new SmtpClient();
        try
        {
            await client.ConnectAsync(_smtpServer, _smtpPort, MailKit.Security.SecureSocketOptions.StartTls);
            await client.AuthenticateAsync(_smtpUser, _smtpPass);
            await client.SendAsync(message);
        }
        finally
        {
            await client.DisconnectAsync(true);
        }
    }
}