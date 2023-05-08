using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ArtFlow.DAL.Migrations
{
    /// <inheritdoc />
    public partial class ArtpiecePhoto : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Artpieces_Photos_PhotoId",
                table: "Artpieces");

            migrationBuilder.AlterColumn<string>(
                name: "PhotoId",
                table: "Artpieces",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AddForeignKey(
                name: "FK_Artpieces_Photos_PhotoId",
                table: "Artpieces",
                column: "PhotoId",
                principalTable: "Photos",
                principalColumn: "PhotoId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Artpieces_Photos_PhotoId",
                table: "Artpieces");

            migrationBuilder.AlterColumn<string>(
                name: "PhotoId",
                table: "Artpieces",
                type: "text",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_Artpieces_Photos_PhotoId",
                table: "Artpieces",
                column: "PhotoId",
                principalTable: "Photos",
                principalColumn: "PhotoId",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
