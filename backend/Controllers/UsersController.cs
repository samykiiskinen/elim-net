using backend.DTOs;
using backend.Models;
using backend.Services.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Data;
using System.Security.Claims;

namespace backend.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserService _userService;
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly ILogger<UsersController> _logger;

        public UsersController(IUserService userService, UserManager<ApplicationUser> userManager, ILogger<UsersController> logger)
        {
            _userService = userService;
            _userManager = userManager;
            _logger = logger;
        }

        [Authorize(Roles = "Admin")]
        [HttpGet]
        public async Task<IActionResult> GetUsers()
        {
            var users = await _userManager.Users.ToListAsync();
            var userRoles = new List<object>();

            foreach (var user in users)
            {
                var roles = await _userManager.GetRolesAsync(user);
                userRoles.Add(new
                {
                    user.Id,
                    user.Email,
                    Roles = roles
                });
            }
            return Ok(userRoles);
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("{email}")]
        public async Task<IActionResult> GetUser(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] UserRegister model)
        {
            if (string.IsNullOrEmpty(model.Email) || string.IsNullOrEmpty(model.Password))
            {
                return BadRequest("Email and Password cannot be empty.");
            }

            var user = new ApplicationUser
            {
                Email = model.Email,
                UserName = model.Email
            };

            try
            {
                var result = await _userManager.CreateAsync(user, model.Password);

                if (result.Succeeded)
                {
                    if (model.Roles != null && model.Roles.Count > 0)
                    {
                        var roleResult = await _userManager.AddToRolesAsync(user, model.Roles);
                        if (!roleResult.Succeeded)
                        {
                            Console.Error.WriteLine($"Failed to assign roles: {string.Join(", ", roleResult.Errors.Select(e => e.Description))}");
                            return BadRequest(roleResult.Errors);
                        }                            
                    }
                    return Ok(new { userId = user.Id, email = user.Email });
                }
                return BadRequest(result.Errors);
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error occurred during registration: {ex.Message}");
                return StatusCode(500, "Internal server error");
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("{email}")]
        public async Task<IActionResult> DeleteUser(string email)
        {
            var user = await _userManager.FindByEmailAsync(email);
            if (user == null)
            {
                return NotFound();
            }

            var result = await _userManager.DeleteAsync(user);
            if (result.Succeeded)
            {
                return Ok();
            }

            return BadRequest(result.Errors);
        }

        [Authorize(Roles = "Admin")]
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(string id, [FromBody] UserRegister model)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            user.Email = model.Email;
            user.UserName = model.Email;

            var result = await _userManager.UpdateAsync(user);
            if (result.Succeeded)
            {
                return Ok();
            }

            return BadRequest(result.Errors);
        }


        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserLogin model)
        {
            try
            {
                var (accessToken, refreshToken, roles) = await _userService.LoginUserAsync(model.Email, model.Password);
                if (!string.IsNullOrWhiteSpace(accessToken))
                {
                    return Ok(new { accessToken, refreshToken });
                }
                _logger.LogWarning("Login failed: access token or refresh token is missing for user {Email}", model.Email);
                return Unauthorized();
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Login error: {ex.Message}");
                _logger.LogError(ex, "Login failed for user {Email}", model.Email); 
                return StatusCode(500, "Internal Server Error");
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpPost("refresh")]
        public async Task<IActionResult> Refresh([FromBody] string refreshToken)
        {
            try
            {
                var newAccessToken = await _userService.RefreshAccessTokenAsync(refreshToken);
                return Ok(new { accessToken = newAccessToken });
            }
            catch (SecurityTokenException ex)
            {
                return Unauthorized(ex.Message);
            }
        }

        [Authorize(Roles = "Admin")]
        [HttpGet("roles")]
        public async Task<IActionResult> GetUserRoles()
        {
            _logger.LogInformation("GetUserRoles endpoint hit.");
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            _logger.LogInformation("User ID from claims: {UserId}", userId);
            if (string.IsNullOrEmpty(userId))
            {
                return BadRequest("User id not found");
            }
            var user = await _userManager.FindByIdAsync(userId);

            if (user == null)
            {
                return NotFound("User not found");
            }
            var roles = await _userManager.GetRolesAsync(user);
            return Ok(new UserRolesDto { Roles = roles.ToList() });
        }
    }
}

