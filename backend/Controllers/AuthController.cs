using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly ApplicationDbContext _context;
    private const string SecretKey = "ThisIsAVerySecureKeyWithAtLeast32Characters1234567890";

    public AuthController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpPost("register")]
    public async Task<IActionResult> Register([FromBody] UserRegisterModel model)
    {
        if (string.IsNullOrEmpty(model.Username) || string.IsNullOrEmpty(model.Password) || string.IsNullOrEmpty(model.Email))
        {
            return BadRequest("Username, email, and password are required");
        }

        if (!IsValidEmail(model.Email))
        {
            return BadRequest("Invalid email format");
        }

        if (await _context.Users.AnyAsync(u => u.Username == model.Username) ||
            await _context.Users.AnyAsync(u => u.Email == model.Email))
        {
            return BadRequest("Username or email is already taken");
        }

        var user = new User
        {
            Username = model.Username,
            Email = model.Email,
            PasswordHash = HashPassword(model.Password),
            EmailVerificationCode = new Random().Next(100000, 999999).ToString(),
            IsVerifiedEmail = false,
        };

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        var emailService = new EmailService();
        await emailService.SendVerificationEmailAsync(user.Email, user.EmailVerificationCode);

        return Ok(new { message = "User registered successfully. Please verify your email." });
    }

    [HttpPost("verify-email")]
    public async Task<IActionResult> VerifyEmail([FromBody] VerifyEmailModel model)
    {
        var user = await _context.Users.FirstOrDefaultAsync(u => u.Email == model.Email);
        if (user == null)
        {
            return BadRequest("Invalid email.");
        }

        if (user.EmailVerificationCode != model.EmailVerificationCode)
        {
            return BadRequest("Invalid verification code.");
        }

        user.IsVerifiedEmail = true;
        await _context.SaveChangesAsync();

        return Ok(new { message = "Email verified successfully!" });
    }

    [HttpPost("login")]
    public async Task<IActionResult> Login([FromBody] LoginRequestModel model)
    {
        if (string.IsNullOrEmpty(model.UsernameOrEmail) || string.IsNullOrEmpty(model.Password))
        {
            return BadRequest("Username/email and password are required");
        }

        var user = await _context.Users.FirstOrDefaultAsync(u =>
            u.Username == model.UsernameOrEmail ||
            u.Email == model.UsernameOrEmail);

        if (user == null || !VerifyPassword(model.Password, user.PasswordHash))
        {
            return Unauthorized("Invalid credentials");
        }

        if (!user.IsVerifiedEmail)
        {
            return BadRequest("Please verify your email first");
        }

        var verificationCode = new Random().Next(100000, 999999).ToString();
        user.EmailVerificationCode = verificationCode;
        await _context.SaveChangesAsync();

        var emailService = new EmailService();
        await emailService.SendAuthAsync(user.Email, verificationCode);

        // Generate JWT token
        var token = GenerateJwtToken(user);

        return Ok(new { token, message = "2FA code sent to your email" });
    }
    private string GenerateJwtToken(User user)
    {
        var tokenHandler = new JwtSecurityTokenHandler();
        var key = Encoding.UTF8.GetBytes(SecretKey);
        var tokenDescriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(new[]
            {
                new Claim(ClaimTypes.Name, user.Username),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString())
            }),
            Expires = DateTime.UtcNow.AddHours(1),
            SigningCredentials = new SigningCredentials(
                new SymmetricSecurityKey(key),
                SecurityAlgorithms.HmacSha256Signature)
        };

        var token = tokenHandler.CreateToken(tokenDescriptor);
        return tokenHandler.WriteToken(token);
    }
    private bool IsValidEmail(string email)
    {
        try
        {
            var addr = new System.Net.Mail.MailAddress(email);
            return addr.Address == email;
        }
        catch
        {
            return false;
        }
    }

    private string HashPassword(string password)
    {
        return BCrypt.Net.BCrypt.HashPassword(password);
    }

    private bool VerifyPassword(string password, string hash)
    {
        return BCrypt.Net.BCrypt.Verify(password, hash);
    }
}

public class VerifyEmailModel
{
    public string Email { get; set; } = string.Empty;
    public string EmailVerificationCode { get; set; } = string.Empty;
}