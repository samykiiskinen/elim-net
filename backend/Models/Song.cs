using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Song
    {
        [Key]
        public int Id { get; set; }
        [Required]
        [MaxLength(100)]
        public required string SongTitle { get; set; }
        [Required]
        public required string SongText { get; set; }

        public SongKey SongKey { get; set; } 


    }
}
