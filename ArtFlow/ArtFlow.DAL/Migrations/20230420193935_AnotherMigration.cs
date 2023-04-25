using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ArtFlow.DAL.Migrations
{
    /// <inheritdoc />
    public partial class AnotherMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "KeepRecommendationId",
                table: "Artpieces");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "KeepRecommendationId",
                table: "Artpieces",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }
    }
}
