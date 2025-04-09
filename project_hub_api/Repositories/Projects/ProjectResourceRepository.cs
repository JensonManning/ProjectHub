using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using project_hub_api.Data;
using project_hub_api.IRepositories.Projects;
using project_hub_api.Models.Projects.Resources;

namespace project_hub_api.Repositories.Projects
{
    public class ProjectResourceRepository : IProjectResourceRepository
    {
        private readonly AppDbContext _context;

        public ProjectResourceRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<ProjectResource>> GetProjectResourcesAsync()
        {
            return await _context.ProjectResources
                .Include(r => r.Project)
                .Include(r => r.User)
                .ToListAsync();
        }

        public async Task<ProjectResource?> GetProjectResourceAsync(int id)
        {
            return await _context.ProjectResources
                .Include(r => r.Project)
                .Include(r => r.User)
                .FirstOrDefaultAsync(r => r.Id == id);
        }

        public async Task<ProjectResource> AddProjectResourceAsync(ProjectResource projectResource)
        {
            await _context.ProjectResources.AddAsync(projectResource);
            await _context.SaveChangesAsync();
            return projectResource;
        }

        public async Task<ProjectResource?> UpdateProjectResourceAsync(int id, ProjectResource projectResource)
        {
            var existingResource = await _context.ProjectResources.FindAsync(id);
            if (existingResource == null)
            {
                return null;
            }

            existingResource.Name = projectResource.Name;
            existingResource.Description = projectResource.Description;
            existingResource.UserId = projectResource.UserId;

            await _context.SaveChangesAsync();
            return existingResource;
        }

        public async Task<ProjectResource?> DeleteProjectResourceAsync(int id)
        {
            var projectResource = await _context.ProjectResources.FindAsync(id);
            if (projectResource == null)
            {
                return null;
            }

            _context.ProjectResources.Remove(projectResource);
            await _context.SaveChangesAsync();
            return projectResource;
        }
    }
}
