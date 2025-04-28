
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using backend.Data;
using backend.Middleware;
using backend.Repositories.Interfaces;
using backend.Repositories;
using backend.Services.Interfaces;
using backend.Services;
using Microsoft.EntityFrameworkCore;
using System.Text;
using backend.Models;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Logging;

namespace backend
{
    public class Program
    {
        public static async Task Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Configure PostgreSQL database connection
            builder.Services.AddDbContext<AppDbContext>(options =>
                options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

            // Add logging configuration
            builder.Logging.ClearProviders();
            builder.Logging.AddConsole();
            builder.Logging.AddDebug();

            // Add CORS configuration
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("AllowOrigin",
                    builder => builder.WithOrigins("http://localhost:5173")
                            .AllowAnyMethod()
                            .AllowAnyHeader());
            });

            // Add services to the container
            builder.Services.AddControllers();
            builder.Services.AddIdentity<ApplicationUser, IdentityRole>()
                .AddEntityFrameworkStores<AppDbContext>()
                .AddDefaultTokenProviders();


            builder.Services.AddAuthorization(options =>
            {
                options.AddPolicy("RequireAdminRole", policy => policy.RequireRole("Admin"));
                options.AddPolicy("RequireSuperUserRole", policy => policy.RequireRole("SuperUser"));
                options.AddPolicy("RequireFinanceUserRole", policy => policy.RequireRole("FinanceUser"));
                options.AddPolicy("RequireAidProjectUserRole", policy => policy.RequireRole("AidProjectUser"));
                options.AddPolicy("RequireMusicUserRole", policy => policy.RequireRole("MusicUser"));
            });

            builder.Services.AddHealthChecks();

            // JWT Authentication configuration
            builder.Services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
                .AddJwtBearer(options =>
                {
                    var jwtKey = builder.Configuration["Jwt:Key"];
                    if (string.IsNullOrEmpty(jwtKey))
                    {
                        throw new ArgumentNullException("Jwt:Key cannot be null or empty.");
                    }
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = true,
                        ValidateAudience = true,
                        ValidateLifetime = true,
                        ValidateIssuerSigningKey = true,
                        ValidIssuer = builder.Configuration["Jwt:Issuer"],
                        ValidAudience = builder.Configuration["Jwt:Audience"],
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtKey))
                };
            });

            builder.Services.Configure<IdentityOptions>(options =>
            {
                options.Password.RequireDigit = true;
                options.Password.RequiredLength = 6;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = true;
                options.Password.RequireLowercase = true;
                options.Password.RequireNonAlphanumeric = true;
                options.Password.RequiredUniqueChars = 3;
            });

            // Register repositories
            builder.Services.AddScoped<IAidProjectRepository, AidProjectRepository>();
            builder.Services.AddScoped<ISongRepository, SongRepository>();                        
            builder.Services.AddScoped<IUserRepository, UserRepository>();

            // Register services
            builder.Services.AddScoped<IAidProjectService, AidProjectService>();
            builder.Services.AddScoped<ISongService, SongService>();
            builder.Services.AddScoped<IUserService, UserService>();

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            app.UseMiddleware<ErrorHandlingMiddleware>();

            using (var scope = app.Services.CreateScope())
            {
                var services = scope.ServiceProvider;
                await SeedRoles(services);
            }

            // Configure the HTTP request pipeline
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();                
            }

            app.UseCors("AllowOrigin");
            app.UseHttpsRedirection();
            app.UseAuthentication();
            app.UseAuthorization();
            app.MapHealthChecks("/health");
            app.MapControllers();
            app.Run();
        }

        private static async Task SeedRoles(IServiceProvider serviceProvider)
        {
            var roleManager = serviceProvider.GetRequiredService<RoleManager<IdentityRole>>();
            string[] roleNames = { "Admin", "Finance", "AidProjects", "Music" };

            foreach (var roleName in roleNames)
            {
                if (!await roleManager.RoleExistsAsync(roleName))
                {
                    await roleManager.CreateAsync(new IdentityRole(roleName));
                }
            }
        }
    }
}
