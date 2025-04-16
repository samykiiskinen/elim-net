
using backend.Data;
using backend.Middleware;
using backend.Repositories.Interfaces;
using backend.Repositories;
using backend.Services.Interfaces;
using backend.Services;
using Microsoft.EntityFrameworkCore;

namespace backend
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Configure PostgreSQL database connection
            builder.Services.AddDbContext<AppDbContext>(options =>
                options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

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

            // Register repositories and services
            builder.Services.AddScoped<ISongRepository, SongRepository>();
            builder.Services.AddScoped<ISongService, SongService>();
            builder.Services.AddScoped<IAidProjectRepository, AidProjectRepository>();
            builder.Services.AddScoped<IAidProjectService, AidProjectService>();

            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            var app = builder.Build();

            app.UseMiddleware<ErrorHandlingMiddleware>();

            // Configure the HTTP request pipeline
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseCors("AllowOrigin");
            app.UseHttpsRedirection();
            app.UseAuthorization();
            app.MapControllers();

            app.Run();
        }
    }
}
