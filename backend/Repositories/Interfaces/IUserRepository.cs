using backend.Models;
using Microsoft.AspNetCore.Identity;

namespace backend.Repositories.Interfaces
{
    public interface IUserRepository
    {
        Task<IdentityUser?> GetUserByEmailAsync(string email);
        Task<IdentityResult> CreateUserAsync(ApplicationUser user, string password);
    }
}
