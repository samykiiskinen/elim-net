using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class AidProjectAttachment
    {
        [Key]
        public int Id { get; set; }

        public int? AidProjectId { get; set; }

        public virtual AidProject? AidProject { get; set; }

        public int? AttachmentId { get; set; }

        public virtual Attachment? Attachment { get; set; }
    }
}
