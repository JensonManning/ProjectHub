using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PH_API.Migrations
{
    /// <inheritdoc />
    public partial class notebookrepo : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TaskRepoResources_ResourceRepo_ResourceRepoId",
                table: "TaskRepoResources");

            migrationBuilder.DropForeignKey(
                name: "FK_TaskRepoResources_TaskRepo_TaskRepoId",
                table: "TaskRepoResources");

            migrationBuilder.CreateTable(
                name: "NotebookRepo",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Content = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NotebookRepo", x => x.Id);
                });

            migrationBuilder.AddForeignKey(
                name: "FK_TaskRepoResources_ResourceRepo_ResourceRepoId",
                table: "TaskRepoResources",
                column: "ResourceRepoId",
                principalTable: "ResourceRepo",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TaskRepoResources_TaskRepo_TaskRepoId",
                table: "TaskRepoResources",
                column: "TaskRepoId",
                principalTable: "TaskRepo",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_TaskRepoResources_ResourceRepo_ResourceRepoId",
                table: "TaskRepoResources");

            migrationBuilder.DropForeignKey(
                name: "FK_TaskRepoResources_TaskRepo_TaskRepoId",
                table: "TaskRepoResources");

            migrationBuilder.DropTable(
                name: "NotebookRepo");

            migrationBuilder.AddForeignKey(
                name: "FK_TaskRepoResources_ResourceRepo_ResourceRepoId",
                table: "TaskRepoResources",
                column: "ResourceRepoId",
                principalTable: "ResourceRepo",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_TaskRepoResources_TaskRepo_TaskRepoId",
                table: "TaskRepoResources",
                column: "TaskRepoId",
                principalTable: "TaskRepo",
                principalColumn: "Id");
        }
    }
}
