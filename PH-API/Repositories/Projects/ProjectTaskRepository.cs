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
    public class ProjectTaskRepository : IProjectTaskRepository
    {
        private readonly AppDbContext _context;

        public ProjectTaskRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<ProjectTask> AddProjectTaskAsync(ProjectTask projectTask)
        {
            await _context.ProjectTasks.AddAsync(projectTask);
            await _context.SaveChangesAsync();
            return projectTask;
        }

        public async Task<ProjectTask> DeleteProjectTaskAsync(int id)
        {
            var projectTask = await _context.ProjectTasks.FindAsync(id);
            if (projectTask == null)
            {
                return null!;
            }

            _context.ProjectTasks.Remove(projectTask);
            await _context.SaveChangesAsync();
            return projectTask;
        }

        public async Task<ProjectTask> GetProjectTaskAsync(int id)
        {
            return await _context.ProjectTasks
                .Include(p => p.ProjectPhase)
                .Include(p => p.ProjectTaskCategory)
                .Include(p => p.ProjectTaskType)
                .Include(p => p.ProjectSubTasks)
                .Include(p => p.ProjectTaskComments)
                .Include(p => p.ProjectTaskResources)
                    .ThenInclude(r => r.ProjectResource)
                .FirstOrDefaultAsync(p => p.Id == id) ?? null!;
        }

        public async Task<List<ProjectTask>> GetProjectTasksAsync()
        {
            return await _context.ProjectTasks
                .Include(p => p.ProjectPhase)
                .Include(p => p.ProjectTaskCategory)
                .Include(p => p.ProjectTaskType)
                .ToListAsync();
        }

        public async Task<ProjectTask> UpdateProjectTaskAsync(int id, ProjectTask projectTask)
        {
            var existingTask = await _context.ProjectTasks.FindAsync(id);
            if (existingTask == null)
            {
                return null!;
            }

            existingTask.Name = projectTask.Name;
            existingTask.Description = projectTask.Description;
            existingTask.Status = projectTask.Status;
            existingTask.StartDate = projectTask.StartDate;
            existingTask.EndDate = projectTask.EndDate;
            existingTask.HasSubTasks = projectTask.HasSubTasks;
            existingTask.ProjectPhaseId = projectTask.ProjectPhaseId;
            existingTask.ProjectTaskCategoryId = projectTask.ProjectTaskCategoryId;
            existingTask.ProjectTaskTypeId = projectTask.ProjectTaskTypeId;

            _context.ProjectTasks.Update(existingTask);
            await _context.SaveChangesAsync();
            return existingTask;
        }
    }
}
