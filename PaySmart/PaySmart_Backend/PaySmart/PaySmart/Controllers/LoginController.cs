using Microsoft.AspNetCore.Mvc;
using PaySmart.Models;

namespace PaySmart.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LoginController : ControllerBase
    {
        private readonly List<(string UserName, string Password)> _users =
        [
            ("admin", "admin123"),
            ("john", "password"),
            ("demo", "demo123")
        ];

        [HttpPost]
        public LoginResponse Login(LoginRequest request)
        {
            var user = _users.FirstOrDefault(u =>
                u.UserName == request.UserName &&
                u.Password == request.Password);
            if (!String.IsNullOrEmpty(user.UserName))
            {
                var response = new LoginResponse
                {
                    StatusCode = 200,
                    Token = Guid.NewGuid().ToString(),
                    Message = "Login successful"
                };
                return response;
            }

            var failedResponse = new LoginResponse
            {
                StatusCode = 401,
                Token = string.Empty,
                Message = "Invalid username or password"
            };
            return failedResponse;
        }
    }
}
