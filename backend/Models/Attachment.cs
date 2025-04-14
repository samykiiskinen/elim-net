using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Attachment
    {
        [Key]
        public int Id { get; set; }

        [Required]
        public string? FilePath { get; set; }

        public string? FileType { get; set; }

        public int AidProjectId { get; set; }

        public virtual ICollection<AidProjectAttachment> AidProjectAttachments { get; set; } = new List<AidProjectAttachment>();
    }
}
