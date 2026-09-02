using GeekHubAPI.Data;
using GeekHubAPI.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=geekhub.db"));

//allows the browser.
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

var app = builder.Build();

using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    dbContext.Database.EnsureCreated();

    if (!dbContext.Characters.Any())
    {
        dbContext.Characters.AddRange(
            new Character
            {
                Name = "Megumin",
                Description = "A maga mais explosiva do mundo!",
                ImageUrl = "/images/MeguminAsset.png",
                GlowColor = "#eab308"
            },
            new Character
            {
                Name = "Kanade",
                Description = "An angel?",
                ImageUrl = "/images/KanadeAsset.png",
                GlowColor = "#3b82f6"
            },
            new Character
            {
                Name = "Kaneki",
                Description = "The Ghoul",
                ImageUrl = "/images/KanekiAsset.png",
                GlowColor = "#ef4444"
            }
        );

        dbContext.SaveChanges();
    }
}

//missing.
app.UseCors("AllowAll"); 

app.UseStaticFiles();
app.MapControllers();

app.Run();