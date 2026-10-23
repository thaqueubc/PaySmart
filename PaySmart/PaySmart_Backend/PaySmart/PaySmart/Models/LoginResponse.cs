namespace PaySmart.Models
{
    public class LoginResponse
    {
        public int StatusCode { get; set; }

        public string Token { get; set; } = string.Empty;

        public string Message { get; set; } = string.Empty;
    }
}
