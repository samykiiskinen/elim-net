using backend.Controllers;
using backend.Models;
using backend.Repositories.Interfaces;
using backend.Services.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace backend.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IConfiguration _configuration;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ILogger<UsersController> _logger;

        public UserService(IUserRepository userRepository, UserManager<ApplicationUser> userManager, IConfiguration configuration, ILogger<UsersController> logger)
        {
            _userRepository = userRepository;
            _userManager = userManager;
            _configuration = configuration;
            _logger = logger;
        }

        public async Task<IdentityResult> RegisterUserAsync(string email, string password, List<string> roles)
        {
            var user = new ApplicationUser { UserName = email, Email = email };
            var result = await _userManager.CreateAsync(user, password);
            if (result.Succeeded && roles != null && roles.Count > 0)
            {
                await _userManager.AddToRolesAsync(user, roles);
            }
            return result;
        }

        public async Task<(string AccessToken, string RefreshToken, List<string> Roles)> LoginUserAsync(string email, string password)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user != null && await _userManager.CheckPasswordAsync(user, password))
            {
                var claims = await GenerateClaimsAsync(user);
                var accessToken = CreateToken(claims);
                var refreshToken = GenerateRefreshToken();


                user.RefreshToken = refreshToken;
                user.RefreshTokenExpiration = DateTime.UtcNow.AddDays(30);
                await _userManager.UpdateAsync(user);

                var roles = await _userManager.GetRolesAsync(user);
                // Log the claims generated during login
                claims = await GenerateClaimsAsync(user);
                foreach (var claim in claims)
                {
                    _logger.LogInformation("Logging of user roles in LoginUserAsync: Claim: {Type} = {Value}", claim.Type, claim.Value);
                }
                return (new JwtSecurityTokenHandler().WriteToken(accessToken), refreshToken, roles.ToList());
            }
            throw new UnauthorizedAccessException("Invalid email or password.");
        }

        public async Task<string> RefreshAccessTokenAsync(string refreshToken)
        {
            var user = await _userManager.Users.FirstOrDefaultAsync(u => u.RefreshToken == refreshToken);

            if (user == null || user.RefreshTokenExpiration < DateTime.UtcNow)
            {
                throw new SecurityTokenException("Invalid or expired refresh token.");
            }

            var claims = await GenerateClaimsAsync(user);
            var newAccessToken = CreateToken(claims);
            var newRefreshToken = GenerateRefreshToken();

            user.RefreshToken = newRefreshToken;
            user.RefreshTokenExpiration = DateTime.UtcNow.AddDays(30);
            await _userManager.UpdateAsync(user);

            return new JwtSecurityTokenHandler().WriteToken(newAccessToken);
        }

        private async Task<List<Claim>> GenerateClaimsAsync(ApplicationUser user)
        {
            var roles = await _userManager.GetRolesAsync(user);
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.UserName ?? user.Email ?? "unknown"),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.NameIdentifier, user.Id),
            };

            foreach (var role in roles)
            {
                if (!string.IsNullOrEmpty(role))
                {
                    claims.Add(new Claim(ClaimTypes.Role, role));
                }
            }
            return claims;
        }

        private JwtSecurityToken CreateToken(List<Claim> claims)
        {
            var jwtKey = _configuration["Jwt:Key"];
            if (string.IsNullOrWhiteSpace(jwtKey))
            {
                throw new InvalidOperationException("The JWT key configuration is missing or empty.");
            }

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
            return new JwtSecurityToken(
                issuer: _configuration["Jwt:Issuer"],
                audience: _configuration["Jwt:Audience"],
                claims: claims,
                expires: DateTime.UtcNow.AddMinutes(30),
                signingCredentials: creds);
        }

        private string GenerateRefreshToken()
        {
            return Guid.NewGuid().ToString();
        }
    }
}