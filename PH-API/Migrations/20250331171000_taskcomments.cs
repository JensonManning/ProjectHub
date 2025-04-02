using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PH_API.Migrations
{
    /// <inheritdoc />
    public partial class taskcomments : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProjectTasks_ProjectTaskCategory_ProjectTaskCategoryId",
                table: "ProjectTasks");

            migrationBuilder.DropTable(
                name: "CategoryTemplates");

            migrationBuilder.DropTable(
                name: "NotebookTemplates");

            migrationBuilder.DropTable(
                name: "ProjectSubTask");

            migrationBuilder.DropTable(
                name: "ProjectTaskCategory");

            migrationBuilder.DropTable(
                name: "SubTaskTemplates");

            migrationBuilder.DropTable(
                name: "TaskTemplateResources");

            migrationBuilder.DropTable(
                name: "ResourceTemplates");

            migrationBuilder.DropTable(
                name: "TaskTemplates");

            migrationBuilder.DropTable(
                name: "PhaseTemplates");

            migrationBuilder.DropTable(
                name: "Templates");

            migrationBuilder.AddColumn<int>(
                name: "ProjectTaskTypeId",
                table: "ProjectTasks",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Content",
                table: "ProjectNotebooks",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "CreatedAt",
                table: "ProjectNotebooks",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "CreatedBy",
                table: "ProjectNotebooks",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<DateTime>(
                name: "UpdatedAt",
                table: "ProjectNotebooks",
                type: "datetime2",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<string>(
                name: "UpdatedBy",
                table: "ProjectNotebooks",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateTable(
                name: "ProjectSubTasks",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false),
                    StartDate = table.Column<DateOnly>(type: "date", nullable: false),
                    EndDate = table.Column<DateOnly>(type: "date", nullable: false),
                    ProjectTaskId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectSubTasks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProjectSubTasks_ProjectTasks_ProjectTaskId",
                        column: x => x.ProjectTaskId,
                        principalTable: "ProjectTasks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProjectTaskCategories",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ProjectPhaseId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectTaskCategories", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProjectTaskCategories_ProjectPhases_ProjectPhaseId",
                        column: x => x.ProjectPhaseId,
                        principalTable: "ProjectPhases",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "ProjectTaskComments",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Content = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ProjectTaskId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectTaskComments", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProjectTaskComments_ProjectTasks_ProjectTaskId",
                        column: x => x.ProjectTaskId,
                        principalTable: "ProjectTasks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProjectTaskType",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectTaskType", x => x.Id);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ProjectTasks_ProjectTaskTypeId",
                table: "ProjectTasks",
                column: "ProjectTaskTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectSubTasks_ProjectTaskId",
                table: "ProjectSubTasks",
                column: "ProjectTaskId");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectTaskCategories_ProjectPhaseId",
                table: "ProjectTaskCategories",
                column: "ProjectPhaseId");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectTaskComments_ProjectTaskId",
                table: "ProjectTaskComments",
                column: "ProjectTaskId");

            migrationBuilder.AddForeignKey(
                name: "FK_ProjectTasks_ProjectTaskCategories_ProjectTaskCategoryId",
                table: "ProjectTasks",
                column: "ProjectTaskCategoryId",
                principalTable: "ProjectTaskCategories",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_ProjectTasks_ProjectTaskType_ProjectTaskTypeId",
                table: "ProjectTasks",
                column: "ProjectTaskTypeId",
                principalTable: "ProjectTaskType",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProjectTasks_ProjectTaskCategories_ProjectTaskCategoryId",
                table: "ProjectTasks");

            migrationBuilder.DropForeignKey(
                name: "FK_ProjectTasks_ProjectTaskType_ProjectTaskTypeId",
                table: "ProjectTasks");

            migrationBuilder.DropTable(
                name: "ProjectSubTasks");

            migrationBuilder.DropTable(
                name: "ProjectTaskCategories");

            migrationBuilder.DropTable(
                name: "ProjectTaskComments");

            migrationBuilder.DropTable(
                name: "ProjectTaskType");

            migrationBuilder.DropIndex(
                name: "IX_ProjectTasks_ProjectTaskTypeId",
                table: "ProjectTasks");

            migrationBuilder.DropColumn(
                name: "ProjectTaskTypeId",
                table: "ProjectTasks");

            migrationBuilder.DropColumn(
                name: "Content",
                table: "ProjectNotebooks");

            migrationBuilder.DropColumn(
                name: "CreatedAt",
                table: "ProjectNotebooks");

            migrationBuilder.DropColumn(
                name: "CreatedBy",
                table: "ProjectNotebooks");

            migrationBuilder.DropColumn(
                name: "UpdatedAt",
                table: "ProjectNotebooks");

            migrationBuilder.DropColumn(
                name: "UpdatedBy",
                table: "ProjectNotebooks");

            migrationBuilder.CreateTable(
                name: "ProjectSubTask",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ProjectTaskId = table.Column<int>(type: "int", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    EndDate = table.Column<DateOnly>(type: "date", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    StartDate = table.Column<DateOnly>(type: "date", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectSubTask", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProjectSubTask_ProjectTasks_ProjectTaskId",
                        column: x => x.ProjectTaskId,
                        principalTable: "ProjectTasks",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProjectTaskCategory",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectTaskCategory", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Templates",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Templates", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "NotebookTemplates",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TemplateId = table.Column<int>(type: "int", nullable: false),
                    Content = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_NotebookTemplates", x => x.Id);
                    table.ForeignKey(
                        name: "FK_NotebookTemplates_Templates_TemplateId",
                        column: x => x.TemplateId,
                        principalTable: "Templates",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "PhaseTemplates",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TemplateId = table.Column<int>(type: "int", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PhaseOrder = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PhaseTemplates", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PhaseTemplates_Templates_TemplateId",
                        column: x => x.TemplateId,
                        principalTable: "Templates",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ResourceTemplates",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TemplateId = table.Column<int>(type: "int", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ResourceTemplates", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ResourceTemplates_Templates_TemplateId",
                        column: x => x.TemplateId,
                        principalTable: "Templates",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TaskTemplates",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    PhaseTemplateId = table.Column<int>(type: "int", nullable: false),
                    CategoryTemplateId = table.Column<int>(type: "int", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PhaseOrder = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TaskTemplates", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TaskTemplates_PhaseTemplates_PhaseTemplateId",
                        column: x => x.PhaseTemplateId,
                        principalTable: "PhaseTemplates",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "CategoryTemplates",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TaskTemplateId = table.Column<int>(type: "int", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CategoryTemplates", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CategoryTemplates_TaskTemplates_TaskTemplateId",
                        column: x => x.TaskTemplateId,
                        principalTable: "TaskTemplates",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "SubTaskTemplates",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TaskTemplateId = table.Column<int>(type: "int", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_SubTaskTemplates", x => x.Id);
                    table.ForeignKey(
                        name: "FK_SubTaskTemplates_TaskTemplates_TaskTemplateId",
                        column: x => x.TaskTemplateId,
                        principalTable: "TaskTemplates",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TaskTemplateResources",
                columns: table => new
                {
                    TaskTemplateId = table.Column<int>(type: "int", nullable: false),
                    ResourceTemplateId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TaskTemplateResources", x => new { x.TaskTemplateId, x.ResourceTemplateId });
                    table.ForeignKey(
                        name: "FK_TaskTemplateResources_ResourceTemplates_ResourceTemplateId",
                        column: x => x.ResourceTemplateId,
                        principalTable: "ResourceTemplates",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_TaskTemplateResources_TaskTemplates_TaskTemplateId",
                        column: x => x.TaskTemplateId,
                        principalTable: "TaskTemplates",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_CategoryTemplates_TaskTemplateId",
                table: "CategoryTemplates",
                column: "TaskTemplateId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_NotebookTemplates_TemplateId",
                table: "NotebookTemplates",
                column: "TemplateId");

            migrationBuilder.CreateIndex(
                name: "IX_PhaseTemplates_TemplateId",
                table: "PhaseTemplates",
                column: "TemplateId");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectSubTask_ProjectTaskId",
                table: "ProjectSubTask",
                column: "ProjectTaskId");

            migrationBuilder.CreateIndex(
                name: "IX_ResourceTemplates_TemplateId",
                table: "ResourceTemplates",
                column: "TemplateId");

            migrationBuilder.CreateIndex(
                name: "IX_SubTaskTemplates_TaskTemplateId",
                table: "SubTaskTemplates",
                column: "TaskTemplateId");

            migrationBuilder.CreateIndex(
                name: "IX_TaskTemplateResources_ResourceTemplateId",
                table: "TaskTemplateResources",
                column: "ResourceTemplateId");

            migrationBuilder.CreateIndex(
                name: "IX_TaskTemplates_PhaseTemplateId",
                table: "TaskTemplates",
                column: "PhaseTemplateId");

            migrationBuilder.AddForeignKey(
                name: "FK_ProjectTasks_ProjectTaskCategory_ProjectTaskCategoryId",
                table: "ProjectTasks",
                column: "ProjectTaskCategoryId",
                principalTable: "ProjectTaskCategory",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
