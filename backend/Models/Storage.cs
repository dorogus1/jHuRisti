public class Storage
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string Size { get; set; } = string.Empty;
    public string Type { get; set; } = string.Empty;
    public int Stock { get; set; }
    public string youtubeId { get; set; } = string.Empty;
    public float Price { get; set; }
    public bool IsDefault { get; set; }
    public string? Image { get; set; }
}