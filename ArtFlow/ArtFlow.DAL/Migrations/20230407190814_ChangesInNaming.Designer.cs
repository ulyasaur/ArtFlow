﻿// <auto-generated />
using System;
using ArtFlow.DAL;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace ArtFlow.DAL.Migrations
{
    [DbContext(typeof(ApplicationContext))]
    [Migration("20230407190814_ChangesInNaming")]
    partial class ChangesInNaming
    {
        /// <inheritdoc />
        protected override void BuildTargetModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "7.0.4")
                .HasAnnotation("Relational:MaxIdentifierLength", 63);

            NpgsqlModelBuilderExtensions.UseIdentityByDefaultColumns(modelBuilder);

            modelBuilder.Entity("ArtFlow.Core.Entities.Artpiece", b =>
                {
                    b.Property<int>("ArtpieceId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("ArtpieceId"));

                    b.Property<string>("AuthorName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("KeepRecommendationId")
                        .HasColumnType("integer");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("OwnerId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("PhotoId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("ArtpieceId");

                    b.HasIndex("OwnerId");

                    b.HasIndex("PhotoId");

                    b.ToTable("Artpieces");
                });

            modelBuilder.Entity("ArtFlow.Core.Entities.Exhibition", b =>
                {
                    b.Property<int>("ExhibitionId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("ExhibitionId"));

                    b.Property<string>("Adress")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("Description")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<DateTimeOffset>("HostedOn")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("OrganiserId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("ExhibitionId");

                    b.HasIndex("OrganiserId");

                    b.ToTable("Exhibitions");
                });

            modelBuilder.Entity("ArtFlow.Core.Entities.ExhibitionArtpiece", b =>
                {
                    b.Property<int>("ExhibitionId")
                        .HasColumnType("integer");

                    b.Property<int>("ArtPieceId")
                        .HasColumnType("integer");

                    b.HasKey("ExhibitionId", "ArtPieceId");

                    b.HasIndex("ArtPieceId");

                    b.ToTable("ExhibitionArtpieces");
                });

            modelBuilder.Entity("ArtFlow.Core.Entities.KeepRecommendation", b =>
                {
                    b.Property<int>("KeepRecommendationId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("KeepRecommendationId"));

                    b.Property<int>("ArtpieceId")
                        .HasColumnType("integer");

                    b.Property<double>("MaxHumidity")
                        .HasColumnType("double precision");

                    b.Property<double>("MaxLight")
                        .HasColumnType("double precision");

                    b.Property<double>("MaxTemperature")
                        .HasColumnType("double precision");

                    b.Property<double>("MinHumidity")
                        .HasColumnType("double precision");

                    b.Property<double>("MinLight")
                        .HasColumnType("double precision");

                    b.Property<double>("MinTemperature")
                        .HasColumnType("double precision");

                    b.HasKey("KeepRecommendationId");

                    b.HasIndex("ArtpieceId")
                        .IsUnique();

                    b.ToTable("KeepRecommendations");
                });

            modelBuilder.Entity("ArtFlow.Core.Entities.Order", b =>
                {
                    b.Property<int>("OrderId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("OrderId"));

                    b.Property<string>("Adress")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("ArtpieceId")
                        .HasColumnType("integer");

                    b.Property<string>("CustomerId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("DriverId")
                        .HasColumnType("text");

                    b.Property<int?>("ExhibitionId")
                        .HasColumnType("integer");

                    b.Property<string>("SellerId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("Status")
                        .HasColumnType("integer");

                    b.Property<DateTimeOffset>("UpdatedOn")
                        .HasColumnType("timestamp with time zone");

                    b.HasKey("OrderId");

                    b.HasIndex("ArtpieceId");

                    b.HasIndex("CustomerId");

                    b.HasIndex("DriverId");

                    b.HasIndex("ExhibitionId");

                    b.HasIndex("SellerId");

                    b.ToTable("Orders");
                });

            modelBuilder.Entity("ArtFlow.Core.Entities.Photo", b =>
                {
                    b.Property<string>("PhotoId")
                        .HasColumnType("text");

                    b.Property<string>("Url")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("PhotoId");

                    b.ToTable("Photos");
                });

            modelBuilder.Entity("ArtFlow.Core.Entities.Room", b =>
                {
                    b.Property<int>("RoomId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("RoomId"));

                    b.Property<int>("ExhibitionId")
                        .HasColumnType("integer");

                    b.Property<string>("Name")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<int>("NumberOfPieces")
                        .HasColumnType("integer");

                    b.HasKey("RoomId");

                    b.HasIndex("ExhibitionId");

                    b.ToTable("Rooms");
                });

            modelBuilder.Entity("ArtFlow.Core.Entities.RoomArtpiece", b =>
                {
                    b.Property<int>("RoomId")
                        .HasColumnType("integer");

                    b.Property<int>("ArtpieceId")
                        .HasColumnType("integer");

                    b.HasKey("RoomId", "ArtpieceId");

                    b.HasIndex("ArtpieceId");

                    b.ToTable("RoomArtpieces");
                });

            modelBuilder.Entity("ArtFlow.Core.Entities.State", b =>
                {
                    b.Property<int>("StateId")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("StateId"));

                    b.Property<DateTimeOffset>("CheckedOn")
                        .HasColumnType("timestamp with time zone");

                    b.Property<double>("Humidity")
                        .HasColumnType("double precision");

                    b.Property<double>("Light")
                        .HasColumnType("double precision");

                    b.Property<int>("OrderId")
                        .HasColumnType("integer");

                    b.Property<double>("Temperature")
                        .HasColumnType("double precision");

                    b.HasKey("StateId");

                    b.HasIndex("OrderId");

                    b.ToTable("States");
                });

            modelBuilder.Entity("ArtFlow.Core.Entities.User", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("text");

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("integer");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("text");

                    b.Property<string>("Email")
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("boolean");

                    b.Property<string>("FirstName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<string>("LastName")
                        .IsRequired()
                        .HasColumnType("text");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("boolean");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("timestamp with time zone");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("text");

                    b.Property<string>("PhoneNumber")
                        .HasColumnType("text");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("boolean");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("text");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("boolean");

                    b.Property<string>("UserName")
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasDatabaseName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasDatabaseName("UserNameIndex");

                    b.ToTable("AspNetUsers", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .HasColumnType("text");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256)
                        .HasColumnType("character varying(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasDatabaseName("RoleNameIndex");

                    b.ToTable("AspNetRoles", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("ClaimType")
                        .HasColumnType("text");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("text");

                    b.Property<string>("RoleId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("integer");

                    NpgsqlPropertyBuilderExtensions.UseIdentityByDefaultColumn(b.Property<int>("Id"));

                    b.Property<string>("ClaimType")
                        .HasColumnType("text");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("text");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider")
                        .HasColumnType("text");

                    b.Property<string>("ProviderKey")
                        .HasColumnType("text");

                    b.Property<string>("ProviderDisplayName")
                        .HasColumnType("text");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("text");

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("text");

                    b.Property<string>("RoleId")
                        .HasColumnType("text");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("text");

                    b.Property<string>("LoginProvider")
                        .HasColumnType("text");

                    b.Property<string>("Name")
                        .HasColumnType("text");

                    b.Property<string>("Value")
                        .HasColumnType("text");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens", (string)null);
                });

            modelBuilder.Entity("ArtFlow.Core.Entities.Artpiece", b =>
                {
                    b.HasOne("ArtFlow.Core.Entities.User", "Owner")
                        .WithMany("Artpieces")
                        .HasForeignKey("OwnerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("ArtFlow.Core.Entities.Photo", "Photo")
                        .WithMany()
                        .HasForeignKey("PhotoId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Owner");

                    b.Navigation("Photo");
                });

            modelBuilder.Entity("ArtFlow.Core.Entities.Exhibition", b =>
                {
                    b.HasOne("ArtFlow.Core.Entities.User", "Organiser")
                        .WithMany("Exhibitions")
                        .HasForeignKey("OrganiserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Organiser");
                });

            modelBuilder.Entity("ArtFlow.Core.Entities.ExhibitionArtpiece", b =>
                {
                    b.HasOne("ArtFlow.Core.Entities.Artpiece", "Artpiece")
                        .WithMany("ExhibitionArtpieces")
                        .HasForeignKey("ArtPieceId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("ArtFlow.Core.Entities.Exhibition", "Exhibition")
                        .WithMany("ExhibitionArtpieces")
                        .HasForeignKey("ExhibitionId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Artpiece");

                    b.Navigation("Exhibition");
                });

            modelBuilder.Entity("ArtFlow.Core.Entities.KeepRecommendation", b =>
                {
                    b.HasOne("ArtFlow.Core.Entities.Artpiece", "Artpiece")
                        .WithOne("KeepRecommendation")
                        .HasForeignKey("ArtFlow.Core.Entities.KeepRecommendation", "ArtpieceId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Artpiece");
                });

            modelBuilder.Entity("ArtFlow.Core.Entities.Order", b =>
                {
                    b.HasOne("ArtFlow.Core.Entities.Artpiece", "Artpiece")
                        .WithMany("Orders")
                        .HasForeignKey("ArtpieceId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("ArtFlow.Core.Entities.User", "Customer")
                        .WithMany("DeliveryOrders")
                        .HasForeignKey("CustomerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("ArtFlow.Core.Entities.User", "Driver")
                        .WithMany("DriveOrders")
                        .HasForeignKey("DriverId");

                    b.HasOne("ArtFlow.Core.Entities.Exhibition", null)
                        .WithMany("Orders")
                        .HasForeignKey("ExhibitionId");

                    b.HasOne("ArtFlow.Core.Entities.User", "Seller")
                        .WithMany("SellOrders")
                        .HasForeignKey("SellerId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Artpiece");

                    b.Navigation("Customer");

                    b.Navigation("Driver");

                    b.Navigation("Seller");
                });

            modelBuilder.Entity("ArtFlow.Core.Entities.Room", b =>
                {
                    b.HasOne("ArtFlow.Core.Entities.Exhibition", "Exhibition")
                        .WithMany("Rooms")
                        .HasForeignKey("ExhibitionId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Exhibition");
                });

            modelBuilder.Entity("ArtFlow.Core.Entities.RoomArtpiece", b =>
                {
                    b.HasOne("ArtFlow.Core.Entities.Artpiece", "Artpiece")
                        .WithMany("RoomArtpieces")
                        .HasForeignKey("ArtpieceId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("ArtFlow.Core.Entities.Room", "Room")
                        .WithMany("RoomArtpieces")
                        .HasForeignKey("RoomId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Artpiece");

                    b.Navigation("Room");
                });

            modelBuilder.Entity("ArtFlow.Core.Entities.State", b =>
                {
                    b.HasOne("ArtFlow.Core.Entities.Order", "Order")
                        .WithMany("States")
                        .HasForeignKey("OrderId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("Order");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("ArtFlow.Core.Entities.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("ArtFlow.Core.Entities.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("ArtFlow.Core.Entities.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("ArtFlow.Core.Entities.User", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("ArtFlow.Core.Entities.Artpiece", b =>
                {
                    b.Navigation("ExhibitionArtpieces");

                    b.Navigation("KeepRecommendation")
                        .IsRequired();

                    b.Navigation("Orders");

                    b.Navigation("RoomArtpieces");
                });

            modelBuilder.Entity("ArtFlow.Core.Entities.Exhibition", b =>
                {
                    b.Navigation("ExhibitionArtpieces");

                    b.Navigation("Orders");

                    b.Navigation("Rooms");
                });

            modelBuilder.Entity("ArtFlow.Core.Entities.Order", b =>
                {
                    b.Navigation("States");
                });

            modelBuilder.Entity("ArtFlow.Core.Entities.Room", b =>
                {
                    b.Navigation("RoomArtpieces");
                });

            modelBuilder.Entity("ArtFlow.Core.Entities.User", b =>
                {
                    b.Navigation("Artpieces");

                    b.Navigation("DeliveryOrders");

                    b.Navigation("DriveOrders");

                    b.Navigation("Exhibitions");

                    b.Navigation("SellOrders");
                });
#pragma warning restore 612, 618
        }
    }
}
