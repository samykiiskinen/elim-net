using backend.Repositories.Interfaces;
using Microsoft.AspNetCore.Identity;

namespace backend.Repositories
{
    public class UserRepository : IUserRepository
    {
        private readonly UserManager<IdentityUser> _userManager;

        public UserRepository(UserManager<IdentityUser> userManager)
        {
            _userManager = userManager;
        }

        public async Task<IdentityUser?> GetUserByEmailAsync(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            return user;
        }

        public async Task<IdentityResult> CreateUserAsync(IdentityUser user, string password)
        {
            return await _userManager.CreateAsync(user, password);
        }
    }
}
