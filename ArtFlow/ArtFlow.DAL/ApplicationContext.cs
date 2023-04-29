using ArtFlow.Core.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ArtFlow.DAL
{
    public class ApplicationContext : IdentityDbContext<User>
    {
        public DbSet<Artpiece> Artpieces { get; set; }

        public DbSet<Exhibition> Exhibitions { get; set; }

        public DbSet<ExhibitionArtpiece> ExhibitionArtpieces { get; set; }

        public DbSet<KeepRecommendation> KeepRecommendations { get; set; }

        public DbSet<Order> Orders { get; set; }

        public DbSet<Photo> Photos { get; set; }

        public DbSet<Room> Rooms { get; set; }

        public DbSet<RoomArtpiece> RoomArtpieces { get; set; }

        public DbSet<State> States { get; set; }

        public DbSet<User> Users { get; set; }

        public ApplicationContext(DbContextOptions<ApplicationContext> options) : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<Artpiece>(a =>
            {
                a.HasOne(u => u.Owner)
                    .WithMany(a => a.Artpieces)
                    .HasForeignKey(u => u.OwnerId);

                a.HasOne(k => k.KeepRecommendation)
                    .WithOne(a => a.Artpiece)
                    .HasForeignKey<KeepRecommendation>(k => k.ArtpieceId);
            });

            builder.Entity<Exhibition>(e =>
            {
                e.HasOne(u => u.Organiser)
                    .WithMany(a => a.Exhibitions)
                    .HasForeignKey(u => u.OrganiserId);
            });

            builder.Entity<ExhibitionArtpiece>(ea =>
            {
                ea.HasKey(k => new { k.ExhibitionId, k.ArtPieceId });

                ea.HasOne(e => e.Exhibition)
                    .WithMany(ea => ea.ExhibitionArtpieces)
                    .HasForeignKey(e => e.ExhibitionId);

                ea.HasOne(a => a.Artpiece)
                    .WithMany(ea => ea.ExhibitionArtpieces)
                    .HasForeignKey(a => a.ArtPieceId);
            });

            builder.Entity<Order>(o =>
            {
                o.HasOne(u => u.Seller)
                    .WithMany(o => o.SellOrders)
                    .HasForeignKey(u => u.SellerId);

                o.HasOne(u => u.Customer)
                    .WithMany(o => o.DeliveryOrders)
                    .HasForeignKey(u => u.CustomerId);

                o.HasOne(u => u.Driver)
                    .WithMany(o => o.DriveOrders)
                    .HasForeignKey(u => u.DriverId);

                o.HasOne(e => e.Exhibition)
                    .WithMany(o => o.Orders)
                    .HasForeignKey(e => e.ExhibitionId);
            });

            builder.Entity<Room>(r =>
            {
                r.HasOne(e => e.Exhibition)
                    .WithMany(r => r.Rooms)
                    .HasForeignKey(e => e.ExhibitionId);
            });

            builder.Entity<RoomArtpiece>(ra =>
            {
                ra.HasKey(k => new { k.RoomId, k.ArtpieceId });

                ra.HasOne(r => r.Room)
                    .WithMany(ra => ra.RoomArtpieces)
                    .HasForeignKey(r => r.RoomId);

                ra.HasOne(a => a.Artpiece)
                    .WithMany(ra => ra.RoomArtpieces)
                    .HasForeignKey(a => a.ArtpieceId);
            });

            builder.Entity<State>(s =>
            {
                s.HasOne(o => o.Order)
                    .WithMany(s => s.States)
                    .HasForeignKey(o => o.OrderId);
            });
        }
    }
}
