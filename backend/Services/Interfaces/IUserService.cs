using backend.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace backend.Services.Interfaces
{
    public interface IUserService
    {
        Task<IdentityResult> RegisterUserAsync(string email, string password, List<string> roles);
        Task<(string AccessToken, string RefreshToken, List<string> Roles)> LoginUserAsync(string email, string password);

        Task<string> RefreshAccessTokenAsync(string refreshToken);

    }
}
