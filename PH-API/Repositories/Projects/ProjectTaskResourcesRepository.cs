using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PH_API.Data;
using PH_API.IRepositories.Projects;
using PH_API.Models.Projects.Tasks;

namespace PH_API.Repositories.Projects
{
    public class ProjectTaskResourcesRepository : IProjectTaskResourcesRepository
    {
        private readonly AppDbContext _context;

        public ProjectTaskResourcesRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<ProjectTask_Resource> AddProjectTaskResourceAsync(ProjectTask_Resource projectTaskResource)
        {
            await _context.ProjectTaskResources.AddAsync(projectTaskResource);
            await _context.SaveChangesAsync();
            return projectTaskResource;
        }

        public async Task<ProjectTask_Resource> DeleteProjectTaskResourceAsync(int id)
        {
            // Since this is a many-to-many relationship with a composite key,
            // we need to find the entity by its ID, which in this case is not a simple integer
            // This method signature might need to be adjusted in the interface to accept composite keys
            var resource = await _context.ProjectTaskResources.FindAsync(id);
            if (resource == null)
            {
                return null!;
            }

            _context.ProjectTaskResources.Remove(resource);
            await _context.SaveChangesAsync();
            return resource;
        }

        public async Task<ProjectTask_Resource> GetProjectTaskResourceAsync(int id)
        {
            // Similar issue with composite key
            return await _context.ProjectTaskResources
                .Include(r => r.ProjectTask)
                .Include(r => r.ProjectResource)
                .FirstOrDefaultAsync(r => r.ProjectTaskId == id) ?? null!;
        }

        public async Task<List<ProjectTask_Resource>> GetProjectTaskResourcesAsync()
        {
            return await _context.ProjectTaskResources
                .Include(r => r.ProjectTask)
                .Include(r => r.ProjectResource)
                .ToListAsync();
        }

        public async Task<ProjectTask_Resource> UpdateProjectTaskResourceAsync(int id, ProjectTask_Resource projectTaskResource)
        {
            // Similar issue with composite key
            var existingResource = await _context.ProjectTaskResources.FindAsync(id);
            if (existingResource == null)
            {
                return null!;
            }

            // Since this is a join table, there might not be many properties to update
            // Usually you would delete the old relationship and create a new one

            _context.ProjectTaskResources.Update(existingResource);
            await _context.SaveChangesAsync();
            return existingResource;
        }
    }
}
