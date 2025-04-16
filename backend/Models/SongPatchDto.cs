namespace backend.Models
{
    public class SongPatchDto
    {
        public string? SongTitle { get; set; }
        public string? SongText { get; set; }
        public SongKey? SongKey { get; set; }
    }
}
