using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata;
using GameBuster.Models;

namespace GameBuster.DBContext
{
    public partial class AppDbContext : DbContext
    {
        public AppDbContext()
        {
        }

        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public virtual DbSet<Character> Characters { get; set; } = null!;
        public virtual DbSet<Customer> Customers { get; set; } = null!;
        public virtual DbSet<Game> Games { get; set; } = null!;
        public virtual DbSet<Platform> Platforms { get; set; } = null!;
        public virtual DbSet<Rent> Rents { get; set; } = null!;

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("");
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Game>(entity =>
            {
                entity.HasMany(d => d.Characters)
                    .WithMany(p => p.Games)
                    .UsingEntity<Dictionary<string, object>>(
                        "CharacterXgame",
                        l => l.HasOne<Character>().WithMany().HasForeignKey("CharacterId").OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("FK_CharacterXGame_Character"),
                        r => r.HasOne<Game>().WithMany().HasForeignKey("GameId").OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("FK_CharacterXGame_Game"),
                        j =>
                        {
                            j.HasKey("GameId", "CharacterId");

                            j.ToTable("CharacterXGame");

                            j.IndexerProperty<int>("GameId").HasColumnName("game_id");

                            j.IndexerProperty<int>("CharacterId").HasColumnName("character_id");
                        });

                entity.HasMany(d => d.Platforms)
                    .WithMany(p => p.Games)
                    .UsingEntity<Dictionary<string, object>>(
                        "PlatformXgame",
                        l => l.HasOne<Platform>().WithMany().HasForeignKey("PlatformId").OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("FK_PlatformXGame_Platform"),
                        r => r.HasOne<Game>().WithMany().HasForeignKey("GameId").OnDelete(DeleteBehavior.ClientSetNull).HasConstraintName("FK_PlatformXGame_Game"),
                        j =>
                        {
                            j.HasKey("GameId", "PlatformId");

                            j.ToTable("PlatformXGame");

                            j.IndexerProperty<int>("GameId").HasColumnName("game_id");

                            j.IndexerProperty<int>("PlatformId").HasColumnName("platform_id");
                        });
            });

            modelBuilder.Entity<Rent>(entity =>
            {
                entity.HasOne(d => d.Customer)
                    .WithMany(p => p.Rents)
                    .HasForeignKey(d => d.CustomerId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Rent_Customer");

                entity.HasOne(d => d.Game)
                    .WithMany(p => p.Rents)
                    .HasForeignKey(d => d.GameId)
                    .OnDelete(DeleteBehavior.ClientSetNull)
                    .HasConstraintName("FK_Rent_Game");
            });

            OnModelCreatingPartial(modelBuilder);
        }

        partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
    }
}
