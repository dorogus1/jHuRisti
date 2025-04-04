public class User
{
    public int Id { get; set; }
    public string Username { get; set; } = string.Empty;
    public string Email { get; set; } = string.Empty;
    public string PasswordHash { get; set; } = string.Empty;
    public string EmailVerificationCode { get; set; } = string.Empty;
    public bool IsVerifiedEmail { get; set; } = false;
}