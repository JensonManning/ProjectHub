using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using project_hub_api.Data;
using project_hub_api.IRepositories.Projects;
using project_hub_api.Models.Projects;

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
                .Include(p => p.ProjectResources)
                    .ThenInclude(resource => resource.User)
                .Include(p => p.ProjectNotebooks)
                .FirstOrDefaultAsync(p => p.Id == id) ?? null!; 
        }

        public async Task<List<Project>> GetProjectsAsync()
        {
            return await _context.Projects
                .Include(p => p.ProjectPhases)
                .Include(p => p.ProjectResources)
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
    }
}