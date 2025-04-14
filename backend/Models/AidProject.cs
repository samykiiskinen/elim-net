using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class AidProject
    {
        [Key]
        public int Id { get; set; }

        public int? Verification { get; set; }

        public string? Date { get; set; }

        public int? AccountNo { get; set; }

        public string? AccountName { get; set; }

        public string? Country { get; set; }

        public string? Receiver { get; set; }

        public string? Purpose { get; set; }

        public string? Decision { get; set; }

        public string? Description { get; set; }

        public decimal? Income { get; set; }

        public decimal? Payment { get; set; }

        public virtual ICollection<AidProjectAttachment> AidProjectAttachments { get; set; } = new List<AidProjectAttachment>();

    }
}
