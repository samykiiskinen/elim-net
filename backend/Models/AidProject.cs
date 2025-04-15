using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class AidProject
    {
        [Key]
        public int Id { get; set; }

        public string? Verification { get; set; }

        public string? Date { get; set; }

        public string? AccountNo { get; set; }

        public string? AccountName { get; set; }

        public string? Country { get; set; }

        public string? Receiver { get; set; }

        public string? Purpose { get; set; }

        public string? Decision { get; set; }

        public string? Income { get; set; }

        public string? Payment { get; set; }

        public virtual ICollection<AidProjectAttachment>? AidProjectAttachments { get; set; } = new List<AidProjectAttachment>();

    }
}
