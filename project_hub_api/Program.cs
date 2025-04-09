using System.Text.Json.Serialization;
using Microsoft.EntityFrameworkCore;
using Microsoft.OpenApi.Models;
using project_hub_api.Data;
using project_hub_api.IRepositories.Projects;
using project_hub_api.IRepositories.Repos;
using project_hub_api.IRepositories.Users;
using project_hub_api.Repositories.Projects;

using project_hub_api.Repositories.Repos;
using project_hub_api.Repositories.Users;
using project_hub_api.Services;
using Scalar.AspNetCore;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<AppDbContext>(opt => opt.UseSqlServer
    (builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddControllers();
builder.Services.AddControllers().AddNewtonsoftJson(options =>
{
    options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore;
});

builder.Services.AddControllers()
    .AddJsonOptions(options => {
        options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
});
    
// Add services to the container
builder.Services.AddOpenApi();
builder.Services.AddEndpointsApiExplorer(); 
builder.Services.AddSwaggerGen();

// Project
builder.Services.AddScoped<IProjectRepository, ProjectRepository>();
builder.Services.AddScoped<IProjectNotebookRepository, ProjectNotebookRepository>();
builder.Services.AddScoped<IProjectPhaseRepository, ProjectPhaseRepository>();
builder.Services.AddScoped<IProjectSubTaskRepository, ProjectSubTaskRepository>();
builder.Services.AddScoped<IProjectTaskCategoryRepository, ProjectTaskCategoryRepository>();
builder.Services.AddScoped<IProjectTaskRepository, ProjectTaskRepository>();
builder.Services.AddScoped<IProjectTaskCommentRepository, ProjectTaskCommentRepository>();
builder.Services.AddScoped<IProjectTaskResourcesRepository, ProjectTaskResourcesRepository>();
builder.Services.AddScoped<IProjectResourceRepository, ProjectResourceRepository>();
builder.Services.AddScoped<IProjectUserRepository, ProjectUserRepository>();
builder.Services.AddScoped<IProjectRoleRepository, ProjectRoleRepository>();

// Repos
builder.Services.AddScoped<ICategoryRepoRepository, CategoryRepoRepository>();
builder.Services.AddScoped<ITaskRepoRepository, TaskRepoRepository>();
builder.Services.AddScoped<IPhaseRepoRepository, PhaseRepoRepository>();
builder.Services.AddScoped<IResourceRepoRepository, ResourceRepoRepository>();
builder.Services.AddScoped<INotebookRepoRepository, NotebookRepoRepository>();
builder.Services.AddScoped<ITaskTypeRepoRepository, TaskTypeRepoRepository>();

// Register project creation service
builder.Services.AddScoped<ProjectCreationService>();
var app = builder.Build();
app.UseSwagger().UseSwaggerUI();
// Configure the HTTP request pipeline
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.MapScalarApiReference();
app.UseHttpsRedirection();
// Add Cors
app.UseCors(options =>
{
    options.AllowAnyHeader();
    options.AllowAnyMethod();
    options.AllowAnyOrigin();
});
app.UseAuthorization();
app.MapControllers();

app.Run();
