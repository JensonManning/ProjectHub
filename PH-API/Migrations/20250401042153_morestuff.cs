using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace PH_API.Migrations
{
    /// <inheritdoc />
    public partial class morestuff : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProjectTaskResources_ProjectResources_ProjectResourceID",
                table: "ProjectTaskResources");

            migrationBuilder.DropForeignKey(
                name: "FK_ProjectTaskResources_ProjectTasks_ProjectTaskID",
                table: "ProjectTaskResources");

            migrationBuilder.DropForeignKey(
                name: "FK_ProjectTasks_ProjectTaskType_ProjectTaskTypeId",
                table: "ProjectTasks");

            migrationBuilder.DropTable(
                name: "ProjectUserPreferences");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ProjectTaskType",
                table: "ProjectTaskType");

            migrationBuilder.DropColumn(
                name: "RoleName",
                table: "ProjectUsers");

            migrationBuilder.DropColumn(
                name: "UserPreferenceID",
                table: "ProjectUsers");

            migrationBuilder.DropColumn(
                name: "Type",
                table: "ProjectResources");

            migrationBuilder.RenameTable(
                name: "ProjectTaskType",
                newName: "ProjectTaskTypes");

            migrationBuilder.RenameColumn(
                name: "ProjectResourceID",
                table: "ProjectTaskResources",
                newName: "ProjectResourceId");

            migrationBuilder.RenameColumn(
                name: "ProjectTaskID",
                table: "ProjectTaskResources",
                newName: "ProjectTaskId");

            migrationBuilder.RenameIndex(
                name: "IX_ProjectTaskResources_ProjectResourceID",
                table: "ProjectTaskResources",
                newName: "IX_ProjectTaskResources_ProjectResourceId");

            migrationBuilder.RenameColumn(
                name: "Date",
                table: "ProjectTaskComments",
                newName: "CommentDate");

            migrationBuilder.AddColumn<string>(
                name: "Phone",
                table: "ProjectUsers",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "CommentBy",
                table: "ProjectTaskComments",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "ProjectResources",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProjectTaskTypes",
                table: "ProjectTaskTypes",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ProjectTaskResources_ProjectResources_ProjectResourceId",
                table: "ProjectTaskResources",
                column: "ProjectResourceId",
                principalTable: "ProjectResources",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ProjectTaskResources_ProjectTasks_ProjectTaskId",
                table: "ProjectTaskResources",
                column: "ProjectTaskId",
                principalTable: "ProjectTasks",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ProjectTasks_ProjectTaskTypes_ProjectTaskTypeId",
                table: "ProjectTasks",
                column: "ProjectTaskTypeId",
                principalTable: "ProjectTaskTypes",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ProjectTaskResources_ProjectResources_ProjectResourceId",
                table: "ProjectTaskResources");

            migrationBuilder.DropForeignKey(
                name: "FK_ProjectTaskResources_ProjectTasks_ProjectTaskId",
                table: "ProjectTaskResources");

            migrationBuilder.DropForeignKey(
                name: "FK_ProjectTasks_ProjectTaskTypes_ProjectTaskTypeId",
                table: "ProjectTasks");

            migrationBuilder.DropPrimaryKey(
                name: "PK_ProjectTaskTypes",
                table: "ProjectTaskTypes");

            migrationBuilder.DropColumn(
                name: "Phone",
                table: "ProjectUsers");

            migrationBuilder.DropColumn(
                name: "CommentBy",
                table: "ProjectTaskComments");

            migrationBuilder.DropColumn(
                name: "Description",
                table: "ProjectResources");

            migrationBuilder.RenameTable(
                name: "ProjectTaskTypes",
                newName: "ProjectTaskType");

            migrationBuilder.RenameColumn(
                name: "ProjectResourceId",
                table: "ProjectTaskResources",
                newName: "ProjectResourceID");

            migrationBuilder.RenameColumn(
                name: "ProjectTaskId",
                table: "ProjectTaskResources",
                newName: "ProjectTaskID");

            migrationBuilder.RenameIndex(
                name: "IX_ProjectTaskResources_ProjectResourceId",
                table: "ProjectTaskResources",
                newName: "IX_ProjectTaskResources_ProjectResourceID");

            migrationBuilder.RenameColumn(
                name: "CommentDate",
                table: "ProjectTaskComments",
                newName: "Date");

            migrationBuilder.AddColumn<string>(
                name: "RoleName",
                table: "ProjectUsers",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "UserPreferenceID",
                table: "ProjectUsers",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<int>(
                name: "Type",
                table: "ProjectResources",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddPrimaryKey(
                name: "PK_ProjectTaskType",
                table: "ProjectTaskType",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "ProjectUserPreferences",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    IsDarkMode = table.Column<bool>(type: "bit", nullable: false),
                    IsSidebarHover = table.Column<bool>(type: "bit", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ProjectUserPreferences", x => x.Id);
                    table.ForeignKey(
                        name: "FK_ProjectUserPreferences_ProjectUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "ProjectUsers",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_ProjectUserPreferences_UserId",
                table: "ProjectUserPreferences",
                column: "UserId",
                unique: true);

            migrationBuilder.AddForeignKey(
                name: "FK_ProjectTaskResources_ProjectResources_ProjectResourceID",
                table: "ProjectTaskResources",
                column: "ProjectResourceID",
                principalTable: "ProjectResources",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ProjectTaskResources_ProjectTasks_ProjectTaskID",
                table: "ProjectTaskResources",
                column: "ProjectTaskID",
                principalTable: "ProjectTasks",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ProjectTasks_ProjectTaskType_ProjectTaskTypeId",
                table: "ProjectTasks",
                column: "ProjectTaskTypeId",
                principalTable: "ProjectTaskType",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
