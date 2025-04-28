using System.Security.Claims;

namespace backend.Models
{
    public class UserRegister
    {
        public required string Email { get; set; }
        public required string Password { get; set; }

        public List<string> Roles { get; set; } = new List<string>();
    }
}
