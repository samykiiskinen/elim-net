﻿// <auto-generated />
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;
using backend.Data;

#nullable disable

namespace backend.Migrations
{
    [DbContext(typeof(AppDbContext))]
    partial class AppDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "9.0.4")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("backend.Models.AidProject", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("AccountName")
                        .HasColumnType("text");

                    b.Property<string>("AccountNo")
                        .HasColumnType("text");

                    b.Property<string>("Country")
                        .HasColumnType("text");

                    b.Property<string>("Date")
                        .HasColumnType("text");

                    b.Property<string>("Decision")
                        .HasColumnType("text");

                    b.Property<string>("Income")
                        .HasColumnType("text");

                    b.Property<string>("Payment")
                        .HasColumnType("text");

                    b.Property<string>("Purpose")
                        .HasColumnType("text");

                    b.Property<string>("Receiver")
                        .HasColumnType("text");

                    b.Property<string>("Verification")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("AidProjects");
                });

            modelBuilder.Entity("backend.Models.AidProjectAttachment", b =>
                {
                    b.Property<int>("AidProjectId")
                        .HasColumnType("integer");

                    b.Property<int>("AttachmentId")
                        .HasColumnType("integer");

                    b.Property<int>("Id")
                        .HasColumnType("integer");

                    b.HasKey("AidProjectId", "AttachmentId");

                    b.HasIndex("AttachmentId");

                    b.ToTable("AidProjectAttachments");
                });

            modelBuilder.Entity("backend.Models.Attachment", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<int?>("AidProjectId")
                        .HasColumnType("integer");

                    b.Property<string>("FilePath")
                        .HasColumnType("text");

                    b.Property<string>("FileType")
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.ToTable("Attachments");
                });

            modelBuilder.Entity("backend.Models.AidProjectAttachment", b =>
                {
                    b.HasOne("backend.Models.AidProject", "AidProject")
                        .WithMany("AidProjectAttachments")
                        .HasForeignKey("AidProjectId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("backend.Models.Attachment", "Attachment")
                        .WithMany("AidProjectAttachments")
                        .HasForeignKey("AttachmentId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("AidProject");

                    b.Navigation("Attachment");
                });

            modelBuilder.Entity("backend.Models.AidProject", b =>
                {
                    b.Navigation("AidProjectAttachments");
                });

            modelBuilder.Entity("backend.Models.Attachment", b =>
                {
                    b.Navigation("AidProjectAttachments");
                });
#pragma warning restore 612, 618
        }
    }
}
