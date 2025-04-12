using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using project_hub_api.Data;
using project_hub_api.IRepositories.Projects;
using project_hub_api.Models.Projects;
using project_hub_api.Models.Projects.Phases;
using project_hub_api.Models.Projects.Tasks;

namespace project_hub_api.Repositories.Projects
{
    public class ProjectRepository : IProjectRepository
    {
        private readonly AppDbContext _context;

        public ProjectRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<Project> AddProjectAsync(Project project)
        {
            await _context.Projects.AddAsync(project);
            await _context.SaveChangesAsync();
            return project;
        }

        public async Task<Project> DeleteProjectAsync(int id)
        {
            var project = await _context.Projects.FindAsync(id);
            if (project == null)
            {
                return null!; 
            }

            _context.Projects.Remove(project);
            await _context.SaveChangesAsync();
            return project;
        }

        public async Task<Project> GetProjectAsync(int id)
        {
            return await _context.Projects
                .Include(p => p.ProjectPhases)
                    .ThenInclude(phase => phase.ProjectTaskCategories)
                .Include(p => p.ProjectPhases)
                    .ThenInclude(phase => phase.ProjectTasks)
                        .ThenInclude(task => task.ProjectTaskCategory)
                .Include(p => p.ProjectPhases)
                    .ThenInclude(phase => phase.ProjectTasks)
                        .ThenInclude(task => task.ProjectTaskComments)
                .Include(p => p.ProjectPhases)
                    .ThenInclude(phase => phase.ProjectTasks)
                        .ThenInclude(task => task.ProjectTaskResources)
                .Include(p => p.ProjectPhases)
                    .ThenInclude(phase => phase.ProjectTasks)
                        .ThenInclude(task => task.ProjectTaskResources)
                            .ThenInclude(resource => resource.ProjectResource)
                .Include(p => p.ProjectResources)
                    .ThenInclude(resource => resource.User)
                .Include(p => p.ProjectNotebooks)
                .Select(p => new Project
                {
                    Id = p.Id,
                    Name = p.Name,
                    Description = p.Description,
                    StartDate = p.StartDate,
                    EndDate = p.EndDate,
                    Status = p.Status,
                    Type = p.Type,
                    ProjectNotebooks = p.ProjectNotebooks,
                    ProjectResources = p.ProjectResources,
                    ProjectPhases = p.ProjectPhases.Select(phase => new ProjectPhase
                    {
                        Id = phase.Id,
                        Name = phase.Name,
                        Description = phase.Description,
                        StartDate = phase.StartDate,
                        EndDate = phase.EndDate,
                        Status = phase.Status,
                        ProjectTaskCategories = phase.ProjectTaskCategories,
                        ProjectTasks = phase.ProjectTasks.Select(task => new ProjectTask
                        {
                            Id = task.Id,
                            Name = task.Name,
                            Description = task.Description,
                            StartDate = task.StartDate,
                            EndDate = task.EndDate,
                            Status = task.Status,
                            ProjectTaskCategory = task.ProjectTaskCategory,
                            ProjectTaskComments = task.ProjectTaskComments,
                            ProjectTaskResources = task.ProjectTaskResources
                        }).ToList()
                    }).ToList()
                })
                .FirstOrDefaultAsync(p => p.Id == id) ?? null!;
        }

        public async Task<List<Project>> GetProjectsAsync()
        {
            return await _context.Projects
                .Include(p => p.ProjectPhases)
                    .ThenInclude(phase => phase.ProjectTaskCategories)
                .Include(p => p.ProjectPhases)
                    .ThenInclude(phase => phase.ProjectTasks)
                        .ThenInclude(task => task.ProjectTaskCategory)
                .Include(p => p.ProjectPhases)
                    .ThenInclude(phase => phase.ProjectTasks)
                        .ThenInclude(task => task.ProjectTaskComments)
                .Include(p => p.ProjectPhases)
                    .ThenInclude(phase => phase.ProjectTasks)
                        .ThenInclude(task => task.ProjectTaskResources)
                .Include(p => p.ProjectPhases)
                    .ThenInclude(phase => phase.ProjectTasks)
                        .ThenInclude(task => task.ProjectTaskResources)
                            .ThenInclude(resource => resource.ProjectResource)
                .Include(p => p.ProjectResources)
                    .ThenInclude(resource => resource.User)
                .Include(p => p.ProjectNotebooks)
                .ToListAsync();
        }

        public async Task<Project> UpdateProjectAsync(int id, Project project)
        {
            var existingProject = await _context.Projects.FindAsync(id);
            if (existingProject == null)
            {
                return null!; 
            }

            existingProject.Name = project.Name;
            existingProject.Description = project.Description;
            existingProject.StartDate = project.StartDate;
            existingProject.EndDate = project.EndDate;
            existingProject.Status = project.Status;
            existingProject.Type = project.Type;

            _context.Projects.Update(existingProject);
            await _context.SaveChangesAsync();
            return existingProject;
        }

        public async Task<List<Project>> GetAllUserProjectsAsync()
        {
            string currentDomainUserName = WindowsIdentity.GetCurrent().Name;
            string currentUser = currentDomainUserName.Split('\\')[1];
            // PrincipalContext context = new PrincipalContext(ContextType.Domain, "xc.lan", "DC=xc,DC=lan");
            // UserPrincipal user = UserPrincipal.FindByIdentity(context, IdentityType.SamAccountName, currentUser);

            if (currentUser == null)
            {
                return null;
            }
            var projects = await _context.Projects
                .Include(p => p.ProjectPhases)
                    .ThenInclude(phase => phase.ProjectTaskCategories)
                .Include(p => p.ProjectPhases)
                    .ThenInclude(phase => phase.ProjectTasks)
                        .ThenInclude(task => task.ProjectTaskCategory)
                .Include(p => p.ProjectPhases)
                    .ThenInclude(phase => phase.ProjectTasks)
                        .ThenInclude(task => task.ProjectTaskComments)
                .Include(p => p.ProjectPhases)
                    .ThenInclude(phase => phase.ProjectTasks)
                        .ThenInclude(task => task.ProjectTaskResources)
                .Include(p => p.ProjectPhases)
                    .ThenInclude(phase => phase.ProjectTasks)
                        .ThenInclude(task => task.ProjectTaskResources)
                            .ThenInclude(resource => resource.ProjectResource)
                .Include(p => p.ProjectResources)
                    .ThenInclude(resource => resource.User)
                .Include(p => p.ProjectNotebooks)
                .Select(p => new Project
                {
                    Id = p.Id,
                    Name = p.Name,
                    Description = p.Description,
                    StartDate = p.StartDate,
                    EndDate = p.EndDate,
                    Status = p.Status,
                    Type = p.Type,
                    ProjectNotebooks = p.ProjectNotebooks,
                    ProjectResources = p.ProjectResources,
                    ProjectPhases = p.ProjectPhases.Select(phase => new ProjectPhase
                    {
                        Id = phase.Id,
                        Name = phase.Name,
                        Description = phase.Description,
                        StartDate = phase.StartDate,
                        EndDate = phase.EndDate,
                        Status = phase.Status,
                        ProjectTaskCategories = phase.ProjectTaskCategories,
                        ProjectTasks = phase.ProjectTasks.Select(task => new ProjectTask
                        {
                            Id = task.Id,
                            Name = task.Name,
                            Description = task.Description,
                            StartDate = task.StartDate,
                            EndDate = task.EndDate,
                            Status = task.Status,
                            ProjectTaskCategory = task.ProjectTaskCategory,
                            ProjectTaskComments = task.ProjectTaskComments,
                            ProjectTaskResources = task.ProjectTaskResources
                        }).ToList()
                    }).ToList()
                })
                .Where(Projects => Projects.ProjectResources.Any(p => p.User.Id == currentUser))
                .ToListAsync();

            return projects;
        }
    }
}