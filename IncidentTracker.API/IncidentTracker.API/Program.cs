using IncidentTracker.API.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();

// Configure CORS policy for Angular frontend
builder.Services.AddCors(options =>
{
    options.AddPolicy("allowCors", policy =>
    {
        policy.WithOrigins("https://localhost:4200", "http://localhost:4200")
              .AllowCredentials()
              .AllowAnyHeader()
              .AllowAnyMethod();
    });
});

// Register DbContext with SQL Server connection string
builder.Services.AddDbContext<IncidentTrackerDbContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("IncidentTrackerDbConnection")));

var app = builder.Build();

app.UseHttpsRedirection();

app.UseCors("allowCors");

app.UseAuthorization();

app.MapControllers();

app.Run();