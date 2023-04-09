using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ArtFlow.DAL.Migrations
{
    /// <inheritdoc />
    public partial class ChangedExhibitions : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Exhibitions_ExhibitionId",
                table: "Orders");

            migrationBuilder.RenameColumn(
                name: "NumberOfPieces",
                table: "Rooms",
                newName: "MaxNumberOfPieces");

            migrationBuilder.RenameColumn(
                name: "HostedOn",
                table: "Exhibitions",
                newName: "StartDate");

            migrationBuilder.AlterColumn<int>(
                name: "ExhibitionId",
                table: "Orders",
                type: "integer",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "integer",
                oldNullable: true);

            migrationBuilder.AddColumn<DateTimeOffset>(
                name: "EndDate",
                table: "Exhibitions",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTimeOffset(new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified), new TimeSpan(0, 0, 0, 0, 0)));

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_Exhibitions_ExhibitionId",
                table: "Orders",
                column: "ExhibitionId",
                principalTable: "Exhibitions",
                principalColumn: "ExhibitionId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Orders_Exhibitions_ExhibitionId",
                table: "Orders");

            migrationBuilder.DropColumn(
                name: "EndDate",
                table: "Exhibitions");

            migrationBuilder.RenameColumn(
                name: "MaxNumberOfPieces",
                table: "Rooms",
                newName: "NumberOfPieces");

            migrationBuilder.RenameColumn(
                name: "StartDate",
                table: "Exhibitions",
                newName: "HostedOn");

            migrationBuilder.AlterColumn<int>(
                name: "ExhibitionId",
                table: "Orders",
                type: "integer",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "integer");

            migrationBuilder.AddForeignKey(
                name: "FK_Orders_Exhibitions_ExhibitionId",
                table: "Orders",
                column: "ExhibitionId",
                principalTable: "Exhibitions",
                principalColumn: "ExhibitionId");
        }
    }
}
