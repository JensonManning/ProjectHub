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
    public class ProjectTaskTypeRepository : IProjectTaskTypeRepository
    {
        private readonly AppDbContext _context;

        public ProjectTaskTypeRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<ProjectTaskType> AddProjectTaskTypeAsync(ProjectTaskType projectTaskType)
        {
            await _context.ProjectTaskTypes.AddAsync(projectTaskType);
            await _context.SaveChangesAsync();
            return projectTaskType;
        }

        public async Task<ProjectTaskType> DeleteProjectTaskTypeAsync(int id)
        {
            var taskType = await _context.ProjectTaskTypes.FindAsync(id);
            if (taskType == null)
            {
                return null!;
            }

            _context.ProjectTaskTypes.Remove(taskType);
            await _context.SaveChangesAsync();
            return taskType;
        }

        public async Task<ProjectTaskType> GetProjectTaskTypeAsync(int id)
        {
            return await _context.ProjectTaskTypes
                .Include(t => t.ProjectTasks)
                .FirstOrDefaultAsync(t => t.Id == id) ?? null!;
        }

        public async Task<List<ProjectTaskType>> GetProjectTaskTypesAsync()
        {
            return await _context.ProjectTaskTypes
                .Include(t => t.ProjectTasks)
                .ToListAsync();
        }

        public async Task<ProjectTaskType> UpdateProjectTaskTypeAsync(int id, ProjectTaskType projectTaskType)
        {
            var existingType = await _context.ProjectTaskTypes.FindAsync(id);
            if (existingType == null)
            {
                return null!;
            }

            existingType.Name = projectTaskType.Name;
            existingType.Description = projectTaskType.Description;

            _context.ProjectTaskTypes.Update(existingType);
            await _context.SaveChangesAsync();
            return existingType;
        }
    }
}
