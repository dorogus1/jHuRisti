public class LoginRequestModel
{
    public string UsernameOrEmail { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
}

public class VerificationRequestModel
{
    public int UserId { get; set; }
    public string Code { get; set; } = string.Empty;
}