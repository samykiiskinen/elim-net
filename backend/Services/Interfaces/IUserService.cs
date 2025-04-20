using backend.Models;
using Microsoft.AspNetCore.Identity;
using System.Security.Claims;

namespace backend.Services.Interfaces
{
    public interface IUserService
    {
        Task<IdentityResult> RegisterUserAsync(string email, string password, List<string> claims);
        Task<string> LoginUserAsync(string email, string password);
    }
}
