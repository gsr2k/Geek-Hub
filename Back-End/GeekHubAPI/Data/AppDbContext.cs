using Microsoft.EntityFrameworkCore;
using GeekHubAPI.Models;

namespace GeekHubAPI.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
    public DbSet<Character> Characters { get; set; }
}