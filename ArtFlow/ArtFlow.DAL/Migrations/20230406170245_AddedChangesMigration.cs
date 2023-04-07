using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ArtFlow.DAL.Migrations
{
    /// <inheritdoc />
    public partial class AddedChangesMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Artpieces_AspNetUsers_AuthorId",
                table: "Artpieces");

            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Artpieces_ArtpieceId",
                table: "Orders");

            migrationBuilder.DropForeignKey(
                name: "FK_Orders_AspNetUsers_DriverId",
                table: "Orders");

            migrationBuilder.RenameColumn(
                name: "AuthorId",
                table: "Artpieces",
                newName: "OwnerId");

            migrationBuilder.RenameIndex(
                name: "IX_Artpieces_AuthorId",
                table: "Artpieces",
                newName: "IX_Artpieces_OwnerId");

            migrationBuilder.AlterColumn<string>(
                name: "DriverId",
                table: "Orders",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<int>(
                name: "ArtpieceId",
                table: "Orders",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AddColumn<DateTimeOffset>(
                name: "UpdatedOn",
                table: "Orders",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.AddColumn<string>(
                name: "AuthorName",
                table: "Artpieces",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddForeignKey(
                name: "FK_Artpieces_AspNetUsers_OwnerId",
                table: "Artpieces",
                column: "OwnerId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_Artpieces_ArtpieceId",
                table: "Orders",
                column: "ArtpieceId",
                principalTable: "Artpieces",
                principalColumn: "ArtpieceId",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_AspNetUsers_DriverId",
                table: "Orders",
                column: "DriverId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Artpieces_AspNetUsers_OwnerId",
                table: "Artpieces");

            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Artpieces_ArtpieceId",
                table: "Orders");

            migrationBuilder.DropForeignKey(
                name: "FK_Orders_AspNetUsers_DriverId",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "UpdatedOn",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "AuthorName",
                table: "Artpieces");

            migrationBuilder.RenameColumn(
                name: "OwnerId",
                table: "Artpieces",
                newName: "AuthorId");

            migrationBuilder.RenameIndex(
                name: "IX_Artpieces_OwnerId",
                table: "Artpieces",
                newName: "IX_Artpieces_AuthorId");

            migrationBuilder.AlterColumn<string>(
                name: "DriverId",
                table: "Orders",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "ArtpieceId",
                table: "Orders",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddForeignKey(
                name: "FK_Artpieces_AspNetUsers_AuthorId",
                table: "Artpieces",
                column: "AuthorId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_Artpieces_ArtpieceId",
                table: "Orders",
                column: "ArtpieceId",
                principalTable: "Artpieces",
                principalColumn: "ArtpieceId");

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_AspNetUsers_DriverId",
                table: "Orders",
                column: "DriverId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
