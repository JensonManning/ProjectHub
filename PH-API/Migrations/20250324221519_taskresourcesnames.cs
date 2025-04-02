using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PH_API.Migrations
{
    /// <inheritdoc />
    public partial class taskresourcesnames : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ResourceRepoName",
                table: "TaskRepoResources",
                type: "nvarchar(max)",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ResourceRepoName",
                table: "TaskRepoResources");
        }
    }
}
