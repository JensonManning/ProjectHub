using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PH_API.Migrations
{
    /// <inheritdoc />
    public partial class removetypes : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Type",
                table: "ResourceRepo");

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

            migrationBuilder.CreateIndex(
                name: "IX_TaskRepo_CategoryId",
                table: "TaskRepo",
                column: "CategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_TaskRepo_ResourceId",
                table: "TaskRepo",
                column: "ResourceId");

            migrationBuilder.AddForeignKey(
                name: "FK_TaskRepo_CategoryRepo_CategoryId",
                table: "TaskRepo",
                column: "CategoryId",
                principalTable: "CategoryRepo",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_TaskRepo_ResourceRepo_ResourceId",
                table: "TaskRepo",
                column: "ResourceId",
                principalTable: "ResourceRepo",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TaskRepo_CategoryRepo_CategoryId",
                table: "TaskRepo");

            migrationBuilder.DropForeignKey(
                name: "FK_TaskRepo_ResourceRepo_ResourceId",
                table: "TaskRepo");

            migrationBuilder.DropIndex(
                name: "IX_TaskRepo_CategoryId",
                table: "TaskRepo");

            migrationBuilder.DropIndex(
                name: "IX_TaskRepo_ResourceId",
                table: "TaskRepo");

            migrationBuilder.DropColumn(
                name: "CategoryId",
                table: "TaskRepo");

            migrationBuilder.DropColumn(
                name: "ResourceId",
                table: "TaskRepo");

            migrationBuilder.AddColumn<int>(
                name: "Type",
                table: "ResourceRepo",
                type: "int",
                nullable: false,
                defaultValue: 0);
        }
    }
}
