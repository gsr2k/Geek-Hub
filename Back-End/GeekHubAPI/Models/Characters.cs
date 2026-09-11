namespace GeekHubAPI.Models;

public class Character
{
    public int Id { get; set; }

    //about the Character
    public string Name { get; set; } = string.Empty;
    public string FullName {get; set;} = string.Empty;
    //to do: Start 1:N N:1 image settings
    public string ImageUrl { get; set; } = string.Empty;
    public string Age {get; set;} = string.Empty;

    //origen
    public string Anime {get; set;} = string.Empty;

    //Infos
    public string Quote {get; set;} = string.Empty;
    public string Description {get; set;} = string.Empty;
    
    //not a list of abilitys to not make it harder, its a simple project for learning the basics only.
    public string Ability {get; set;} = string.Empty;

    //visual
    public string GlowColor { get; set; } = "#eab308";    
}