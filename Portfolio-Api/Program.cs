using Microsoft.EntityFrameworkCore;
using Portfolio_Api.Models;
using Portfolio_Api.Services;

var builder = WebApplication.CreateBuilder(args);

//config variables
var DbConnectionString = Environment.GetEnvironmentVariable("DbConnectionString") ?? "Server=localhost; Port=5432; Database=portfoliodb; User Id=postgres; Password=admin";

// Add services to the container.
builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<PortfolioDbContext>(options =>{
    options.UseNpgsql(DbConnectionString);
});
builder.Services.AddTransient<IRepository, BlogRepository>();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}
//app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
