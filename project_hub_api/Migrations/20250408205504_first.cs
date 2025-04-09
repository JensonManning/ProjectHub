using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace project_hub_api.Migrations
{
    /// <inheritdoc />
    public partial class first : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "CategoryRepo",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CategoryRepo", x => x.Id);
                });

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

            migrationBuilder.CreateTable(
                name: "PhaseRepo",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Order = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PhaseRepo", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ProjectRoles",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectRoles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Projects",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Shortcode = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    StartDate = table.Column<DateOnly>(type: "date", nullable: false),
                    EndDate = table.Column<DateOnly>(type: "date", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false),
                    Type = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Projects", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ResourceRepo",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ResourceRepo", x => x.Id);
                });

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

            migrationBuilder.CreateTable(
                name: "ProjectUsers",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Email = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Phone = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    RoleId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectUsers", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProjectUsers_ProjectRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "ProjectRoles",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "ProjectNotebooks",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Content = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CreatedBy = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    UpdatedBy = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ProjectId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectNotebooks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProjectNotebooks_Projects_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Projects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProjectPhases",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    StartDate = table.Column<DateOnly>(type: "date", nullable: false),
                    EndDate = table.Column<DateOnly>(type: "date", nullable: false),
                    Order = table.Column<int>(type: "int", nullable: false),
                    ProjectId = table.Column<int>(type: "int", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectPhases", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProjectPhases_Projects_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Projects",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "TaskRepo",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    PhaseOrder = table.Column<int>(type: "int", nullable: false),
                    HasSubTaskRepo = table.Column<bool>(type: "bit", nullable: false),
                    CategoryRepoId = table.Column<int>(type: "int", nullable: true),
                    TaskTypeRepoId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TaskRepo", x => x.Id);
                    table.ForeignKey(
                        name: "FK_TaskRepo_CategoryRepo_CategoryRepoId",
                        column: x => x.CategoryRepoId,
                        principalTable: "CategoryRepo",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_TaskRepo_TaskTypeRepo_TaskTypeRepoId",
                        column: x => x.TaskTypeRepoId,
                        principalTable: "TaskTypeRepo",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateTable(
                name: "ProjectResources",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    ProjectId = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectResources", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProjectResources_ProjectUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "ProjectUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProjectResources_Projects_ProjectId",
                        column: x => x.ProjectId,
                        principalTable: "Projects",
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
                    ResourceRepoId = table.Column<int>(type: "int", nullable: false),
                    ResourceRepoName = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TaskRepoResources", x => new { x.TaskRepoId, x.ResourceRepoId });
                    table.ForeignKey(
                        name: "FK_TaskRepoResources_ResourceRepo_ResourceRepoId",
                        column: x => x.ResourceRepoId,
                        principalTable: "ResourceRepo",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_TaskRepoResources_TaskRepo_TaskRepoId",
                        column: x => x.TaskRepoId,
                        principalTable: "TaskRepo",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "ProjectTasks",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Description = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Status = table.Column<int>(type: "int", nullable: false),
                    StartDate = table.Column<DateOnly>(type: "date", nullable: false),
                    EndDate = table.Column<DateOnly>(type: "date", nullable: false),
                    HasSubTasks = table.Column<bool>(type: "bit", nullable: false),
                    ProjectPhaseId = table.Column<int>(type: "int", nullable: false),
                    ProjectTaskCategoryId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectTasks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProjectTasks_ProjectPhases_ProjectPhaseId",
                        column: x => x.ProjectPhaseId,
                        principalTable: "ProjectPhases",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_ProjectTasks_ProjectTaskCategories_ProjectTaskCategoryId",
                        column: x => x.ProjectTaskCategoryId,
                        principalTable: "ProjectTaskCategories",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

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
                name: "ProjectTaskComments",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Content = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    CommentDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    CommentBy = table.Column<string>(type: "nvarchar(max)", nullable: false),
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
                name: "ProjectTaskResources",
                columns: table => new
                {
                    ProjectResourceId = table.Column<int>(type: "int", nullable: false),
                    ProjectTaskId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectTaskResources", x => new { x.ProjectTaskId, x.ProjectResourceId });
                    table.ForeignKey(
                        name: "FK_ProjectTaskResources_ProjectResources_ProjectResourceId",
                        column: x => x.ProjectResourceId,
                        principalTable: "ProjectResources",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_ProjectTaskResources_ProjectTasks_ProjectTaskId",
                        column: x => x.ProjectTaskId,
                        principalTable: "ProjectTasks",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_ProjectNotebooks_ProjectId",
                table: "ProjectNotebooks",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectPhases_ProjectId",
                table: "ProjectPhases",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectResources_ProjectId",
                table: "ProjectResources",
                column: "ProjectId");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectResources_UserId",
                table: "ProjectResources",
                column: "UserId");

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

            migrationBuilder.CreateIndex(
                name: "IX_ProjectTaskResources_ProjectResourceId",
                table: "ProjectTaskResources",
                column: "ProjectResourceId");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectTasks_ProjectPhaseId",
                table: "ProjectTasks",
                column: "ProjectPhaseId");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectTasks_ProjectTaskCategoryId",
                table: "ProjectTasks",
                column: "ProjectTaskCategoryId");

            migrationBuilder.CreateIndex(
                name: "IX_ProjectUsers_RoleId",
                table: "ProjectUsers",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "IX_SubTaskRepo_TaskId",
                table: "SubTaskRepo",
                column: "TaskId");

            migrationBuilder.CreateIndex(
                name: "IX_TaskRepo_CategoryRepoId",
                table: "TaskRepo",
                column: "CategoryRepoId");

            migrationBuilder.CreateIndex(
                name: "IX_TaskRepo_TaskTypeRepoId",
                table: "TaskRepo",
                column: "TaskTypeRepoId");

            migrationBuilder.CreateIndex(
                name: "IX_TaskRepoResources_ResourceRepoId",
                table: "TaskRepoResources",
                column: "ResourceRepoId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "NotebookRepo");

            migrationBuilder.DropTable(
                name: "PhaseRepo");

            migrationBuilder.DropTable(
                name: "ProjectNotebooks");

            migrationBuilder.DropTable(
                name: "ProjectSubTasks");

            migrationBuilder.DropTable(
                name: "ProjectTaskComments");

            migrationBuilder.DropTable(
                name: "ProjectTaskResources");

            migrationBuilder.DropTable(
                name: "SubTaskRepo");

            migrationBuilder.DropTable(
                name: "TaskRepoResources");

            migrationBuilder.DropTable(
                name: "ProjectResources");

            migrationBuilder.DropTable(
                name: "ProjectTasks");

            migrationBuilder.DropTable(
                name: "ResourceRepo");

            migrationBuilder.DropTable(
                name: "TaskRepo");

            migrationBuilder.DropTable(
                name: "ProjectUsers");

            migrationBuilder.DropTable(
                name: "ProjectTaskCategories");

            migrationBuilder.DropTable(
                name: "CategoryRepo");

            migrationBuilder.DropTable(
                name: "TaskTypeRepo");

            migrationBuilder.DropTable(
                name: "ProjectRoles");

            migrationBuilder.DropTable(
                name: "ProjectPhases");

            migrationBuilder.DropTable(
                name: "Projects");
        }
    }
}
