using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PH_API.Migrations
{
    /// <inheritdoc />
    public partial class taskrepocatname : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TaskRepo_ResourceRepo_ResourceRepoId",
                table: "TaskRepo");

            migrationBuilder.DropIndex(
                name: "IX_TaskRepo_ResourceRepoId",
                table: "TaskRepo");

            migrationBuilder.DropColumn(
                name: "CategoryId",
                table: "TaskRepo");

            migrationBuilder.DropColumn(
                name: "ResourceId",
                table: "TaskRepo");

            migrationBuilder.DropColumn(
                name: "ResourceRepoId",
                table: "TaskRepo");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CategoryId",
                table: "TaskRepo",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ResourceId",
                table: "TaskRepo",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "ResourceRepoId",
                table: "TaskRepo",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_TaskRepo_ResourceRepoId",
                table: "TaskRepo",
                column: "ResourceRepoId");

            migrationBuilder.AddForeignKey(
                name: "FK_TaskRepo_ResourceRepo_ResourceRepoId",
                table: "TaskRepo",
                column: "ResourceRepoId",
                principalTable: "ResourceRepo",
                principalColumn: "Id");
        }
    }
}
