using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PH_API.Migrations
{
    /// <inheritdoc />
    public partial class tasktyperepo : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_SubTaskTemplate_TaskTemplates_TaskTemplateId",
                table: "SubTaskTemplate");

            migrationBuilder.DropForeignKey(
                name: "FK_TaskTemplate_Resource_ResourceTemplates_ResourceTemplateId",
                table: "TaskTemplate_Resource");

            migrationBuilder.DropForeignKey(
                name: "FK_TaskTemplate_Resource_TaskTemplates_TaskTemplateId",
                table: "TaskTemplate_Resource");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TaskTemplate_Resource",
                table: "TaskTemplate_Resource");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SubTaskTemplate",
                table: "SubTaskTemplate");

            migrationBuilder.DropColumn(
                name: "ResourceTemplateName",
                table: "TaskTemplate_Resource");

            migrationBuilder.DropColumn(
                name: "TaskTemplateName",
                table: "TaskTemplate_Resource");

            migrationBuilder.RenameTable(
                name: "TaskTemplate_Resource",
                newName: "TaskTemplateResources");

            migrationBuilder.RenameTable(
                name: "SubTaskTemplate",
                newName: "SubTaskTemplates");

            migrationBuilder.RenameIndex(
                name: "IX_TaskTemplate_Resource_ResourceTemplateId",
                table: "TaskTemplateResources",
                newName: "IX_TaskTemplateResources_ResourceTemplateId");

            migrationBuilder.RenameIndex(
                name: "IX_SubTaskTemplate_TaskTemplateId",
                table: "SubTaskTemplates",
                newName: "IX_SubTaskTemplates_TaskTemplateId");

            migrationBuilder.AddColumn<int>(
                name: "TaskTypeRepoId",
                table: "TaskRepo",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "TemplateId",
                table: "NotebookTemplates",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_TaskTemplateResources",
                table: "TaskTemplateResources",
                columns: new[] { "TaskTemplateId", "ResourceTemplateId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_SubTaskTemplates",
                table: "SubTaskTemplates",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "TaskTypeRepo",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TaskTypeRepo", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_TaskRepo_TaskTypeRepoId",
                table: "TaskRepo",
                column: "TaskTypeRepoId");

            migrationBuilder.CreateIndex(
                name: "IX_NotebookTemplates_TemplateId",
                table: "NotebookTemplates",
                column: "TemplateId");

            migrationBuilder.AddForeignKey(
                name: "FK_NotebookTemplates_Templates_TemplateId",
                table: "NotebookTemplates",
                column: "TemplateId",
                principalTable: "Templates",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_SubTaskTemplates_TaskTemplates_TaskTemplateId",
                table: "SubTaskTemplates",
                column: "TaskTemplateId",
                principalTable: "TaskTemplates",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TaskRepo_TaskTypeRepo_TaskTypeRepoId",
                table: "TaskRepo",
                column: "TaskTypeRepoId",
                principalTable: "TaskTypeRepo",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_TaskTemplateResources_ResourceTemplates_ResourceTemplateId",
                table: "TaskTemplateResources",
                column: "ResourceTemplateId",
                principalTable: "ResourceTemplates",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_TaskTemplateResources_TaskTemplates_TaskTemplateId",
                table: "TaskTemplateResources",
                column: "TaskTemplateId",
                principalTable: "TaskTemplates",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_NotebookTemplates_Templates_TemplateId",
                table: "NotebookTemplates");

            migrationBuilder.DropForeignKey(
                name: "FK_SubTaskTemplates_TaskTemplates_TaskTemplateId",
                table: "SubTaskTemplates");

            migrationBuilder.DropForeignKey(
                name: "FK_TaskRepo_TaskTypeRepo_TaskTypeRepoId",
                table: "TaskRepo");

            migrationBuilder.DropForeignKey(
                name: "FK_TaskTemplateResources_ResourceTemplates_ResourceTemplateId",
                table: "TaskTemplateResources");

            migrationBuilder.DropForeignKey(
                name: "FK_TaskTemplateResources_TaskTemplates_TaskTemplateId",
                table: "TaskTemplateResources");

            migrationBuilder.DropTable(
                name: "TaskTypeRepo");

            migrationBuilder.DropIndex(
                name: "IX_TaskRepo_TaskTypeRepoId",
                table: "TaskRepo");

            migrationBuilder.DropIndex(
                name: "IX_NotebookTemplates_TemplateId",
                table: "NotebookTemplates");

            migrationBuilder.DropPrimaryKey(
                name: "PK_TaskTemplateResources",
                table: "TaskTemplateResources");

            migrationBuilder.DropPrimaryKey(
                name: "PK_SubTaskTemplates",
                table: "SubTaskTemplates");

            migrationBuilder.DropColumn(
                name: "TaskTypeRepoId",
                table: "TaskRepo");

            migrationBuilder.DropColumn(
                name: "TemplateId",
                table: "NotebookTemplates");

            migrationBuilder.RenameTable(
                name: "TaskTemplateResources",
                newName: "TaskTemplate_Resource");

            migrationBuilder.RenameTable(
                name: "SubTaskTemplates",
                newName: "SubTaskTemplate");

            migrationBuilder.RenameIndex(
                name: "IX_TaskTemplateResources_ResourceTemplateId",
                table: "TaskTemplate_Resource",
                newName: "IX_TaskTemplate_Resource_ResourceTemplateId");

            migrationBuilder.RenameIndex(
                name: "IX_SubTaskTemplates_TaskTemplateId",
                table: "SubTaskTemplate",
                newName: "IX_SubTaskTemplate_TaskTemplateId");

            migrationBuilder.AddColumn<string>(
                name: "ResourceTemplateName",
                table: "TaskTemplate_Resource",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "TaskTemplateName",
                table: "TaskTemplate_Resource",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddPrimaryKey(
                name: "PK_TaskTemplate_Resource",
                table: "TaskTemplate_Resource",
                columns: new[] { "TaskTemplateId", "ResourceTemplateId" });

            migrationBuilder.AddPrimaryKey(
                name: "PK_SubTaskTemplate",
                table: "SubTaskTemplate",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_SubTaskTemplate_TaskTemplates_TaskTemplateId",
                table: "SubTaskTemplate",
                column: "TaskTemplateId",
                principalTable: "TaskTemplates",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_TaskTemplate_Resource_ResourceTemplates_ResourceTemplateId",
                table: "TaskTemplate_Resource",
                column: "ResourceTemplateId",
                principalTable: "ResourceTemplates",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_TaskTemplate_Resource_TaskTemplates_TaskTemplateId",
                table: "TaskTemplate_Resource",
                column: "TaskTemplateId",
                principalTable: "TaskTemplates",
                principalColumn: "Id");
        }
    }
}
