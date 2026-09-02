using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using GeekHubAPI.Data;
using GeekHubAPI.Models;
//study more
namespace GeekHubAPI.Controllers;

[Route("api/[controller]")]
[ApiController]
public class CharactersController : ControllerBase
{
    private readonly AppDbContext _context;

    public CharactersController(AppDbContext context)
    {
        _context = context;
    }

    // GET: api/characters
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Character>>> GetCharacters()
    {
        return await _context.Characters.ToListAsync();
    }

        // GET: api/characters/random
    [HttpGet("random")]
    public async Task<ActionResult<Character>> GetRandomCharacter()
    {
        var count = await _context.Characters.CountAsync();
        if (count == 0) return NotFound();

        var randomIndex = Random.Shared.Next(count);
        
        var character = await _context.Characters.Skip(randomIndex).FirstOrDefaultAsync();
                
        if (character == null) return NotFound();

        return character;
    }
}