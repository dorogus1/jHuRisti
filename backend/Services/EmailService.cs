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
}