using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
        public DbSet<AidProject> AidProjects { get; set; }
        public DbSet<Attachment> Attachments { get; set; }
        public DbSet<AidProjectAttachment> AidProjectAttachments { get; set; }

        public DbSet<Song> Songs { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<AidProjectAttachment>()
                .HasKey(ap => new { ap.AidProjectId, ap.AttachmentId });

            modelBuilder.Entity<AidProjectAttachment>()
                .HasOne(ap => ap.AidProject)
                .WithMany(a => a.AidProjectAttachments)
                .HasForeignKey(ap => ap.AidProjectId);

            modelBuilder.Entity<AidProjectAttachment>()
                .HasOne(ap => ap.Attachment)
                .WithMany(a => a.AidProjectAttachments)
                .HasForeignKey(ap => ap.AttachmentId);

            modelBuilder.Entity<Song>()
                .Property(s => s.SongTitle)
                .IsRequired()
                .HasMaxLength(100);

            modelBuilder.Entity<Song>()
                .Property(s => s.SongText)
                .IsRequired();

            modelBuilder.Entity<Song>()
                .Property(s => s.SongKey)
                .IsRequired();
        }
    }
}
