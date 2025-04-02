using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PH_API.Migrations
{
    /// <inheritdoc />
    public partial class taskresources : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
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

            migrationBuilder.AddColumn<int>(
                name: "CategoryRepoId",
                table: "TaskRepo",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "HasSubTaskRepo",
                table: "TaskRepo",
                type: "bit",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "ResourceRepoId",
                table: "TaskRepo",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "SubTaskRepo",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TaskId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SubTaskRepo", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SubTaskRepo_TaskRepo_TaskId",
                        column: x => x.TaskId,
                        principalTable: "TaskRepo",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "TaskRepoResources",
                columns: table => new
                {
                    TaskRepoId = table.Column<int>(type: "int", nullable: false),
                    ResourceRepoId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TaskRepoResources", x => new { x.TaskRepoId, x.ResourceRepoId });
                    table.ForeignKey(
                        name: "FK_TaskRepoResources_ResourceRepo_ResourceRepoId",
                        column: x => x.ResourceRepoId,
                        principalTable: "ResourceRepo",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_TaskRepoResources_TaskRepo_TaskRepoId",
                        column: x => x.TaskRepoId,
                        principalTable: "TaskRepo",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_TaskRepo_CategoryRepoId",
                table: "TaskRepo",
                column: "CategoryRepoId");

            migrationBuilder.CreateIndex(
                name: "IX_TaskRepo_ResourceRepoId",
                table: "TaskRepo",
                column: "ResourceRepoId");

            migrationBuilder.CreateIndex(
                name: "IX_SubTaskRepo_TaskId",
                table: "SubTaskRepo",
                column: "TaskId");

            migrationBuilder.CreateIndex(
                name: "IX_TaskRepoResources_ResourceRepoId",
                table: "TaskRepoResources",
                column: "ResourceRepoId");

            migrationBuilder.AddForeignKey(
                name: "FK_TaskRepo_CategoryRepo_CategoryRepoId",
                table: "TaskRepo",
                column: "CategoryRepoId",
                principalTable: "CategoryRepo",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_TaskRepo_ResourceRepo_ResourceRepoId",
                table: "TaskRepo",
                column: "ResourceRepoId",
                principalTable: "ResourceRepo",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TaskRepo_CategoryRepo_CategoryRepoId",
                table: "TaskRepo");

            migrationBuilder.DropForeignKey(
                name: "FK_TaskRepo_ResourceRepo_ResourceRepoId",
                table: "TaskRepo");

            migrationBuilder.DropTable(
                name: "SubTaskRepo");

            migrationBuilder.DropTable(
                name: "TaskRepoResources");

            migrationBuilder.DropIndex(
                name: "IX_TaskRepo_CategoryRepoId",
                table: "TaskRepo");

            migrationBuilder.DropIndex(
                name: "IX_TaskRepo_ResourceRepoId",
                table: "TaskRepo");

            migrationBuilder.DropColumn(
                name: "CategoryRepoId",
                table: "TaskRepo");

            migrationBuilder.DropColumn(
                name: "HasSubTaskRepo",
                table: "TaskRepo");

            migrationBuilder.DropColumn(
                name: "ResourceRepoId",
                table: "TaskRepo");

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
    }
}
