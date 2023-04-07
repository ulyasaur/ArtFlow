using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ArtFlow.DAL.Migrations
{
    /// <inheritdoc />
    public partial class ChangesInNaming : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Rooms_Exhibitions_EshibitionId",
                table: "Rooms");

            migrationBuilder.RenameColumn(
                name: "EshibitionId",
                table: "Rooms",
                newName: "ExhibitionId");

            migrationBuilder.RenameIndex(
                name: "IX_Rooms_EshibitionId",
                table: "Rooms",
                newName: "IX_Rooms_ExhibitionId");

            migrationBuilder.AddForeignKey(
                name: "FK_Rooms_Exhibitions_ExhibitionId",
                table: "Rooms",
                column: "ExhibitionId",
                principalTable: "Exhibitions",
                principalColumn: "ExhibitionId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Rooms_Exhibitions_ExhibitionId",
                table: "Rooms");

            migrationBuilder.RenameColumn(
                name: "ExhibitionId",
                table: "Rooms",
                newName: "EshibitionId");

            migrationBuilder.RenameIndex(
                name: "IX_Rooms_ExhibitionId",
                table: "Rooms",
                newName: "IX_Rooms_EshibitionId");

            migrationBuilder.AddForeignKey(
                name: "FK_Rooms_Exhibitions_EshibitionId",
                table: "Rooms",
                column: "EshibitionId",
                principalTable: "Exhibitions",
                principalColumn: "ExhibitionId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
