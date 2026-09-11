using GeekHubAPI.Data;
using GeekHubAPI.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddControllers();
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseSqlite("Data Source=geekhub.db"));

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
    //infos fully AI made, idk about characters deeply.
    if (!dbContext.Characters.Any())
    {
        dbContext.Characters.AddRange(
            new Character
            {
                Name = "Megumin",
                FullName = "Megumin",
                Age = "14",
                Anime = "KonoSuba",
                Quote = "EXPLOSION!",
                Description = "A maga mais explosiva do mundo!",
                Ability = "Explosion Magic",
                ImageUrl = "/images/MeguminAsset.png",
                GlowColor = "#eab308"
            },
            new Character
            {
                Name = "Kanade",
                FullName = "Kanade Tachibana",
                Age = "Unknown",
                Anime = "Angel Beats!",
                Quote = "...",
                Description = "An angel who fights to protect the afterlife.",
                Ability = "Hand Sonic",
                ImageUrl = "/images/KanadeAsset.png",
                GlowColor = "#3b82f6"
            },
            new Character
            {
                Name = "Kaneki",
                FullName = "Ken Kaneki",
                Age = "19",
                Anime = "Tokyo Ghoul",
                Quote = "I'm not the protagonist of a novel or anything.",
                Description = "The Ghoul who walks the line between human and monster.",
                Ability = "Rinkaku Kagune",
                ImageUrl = "/images/KanekiAsset.png",
                GlowColor = "#ef4444"
            }
        );

        dbContext.SaveChanges();
    }
}

app.UseCors("AllowAll");

app.UseStaticFiles();
app.MapControllers();

app.Run();