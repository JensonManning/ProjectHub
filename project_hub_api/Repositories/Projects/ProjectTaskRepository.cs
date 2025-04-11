using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using project_hub_api.Data;
using project_hub_api.IRepositories.Projects;
using project_hub_api.Models.Projects.Tasks;

namespace project_hub_api.Repositories.Projects
{
    public class ProjectTaskRepository : IProjectTaskRepository
    {
        private readonly AppDbContext _context;

        public ProjectTaskRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<ProjectTask> AddProjectTaskAsync(ProjectTask projectTask, List<int> resourceIds)
        {
            await _context.ProjectTasks.AddAsync(projectTask);
            await _context.SaveChangesAsync();

            if (resourceIds?.Count > 0) // Handle null or empty list
            {
                // Validate that all resourceIds exist in the ResourceRepo table
                var validResourceIds = await _context.ResourceRepo
                    .Where(r => resourceIds.Contains(r.Id))
                    .Select(r => r.Id)
                    .ToListAsync();

                if (validResourceIds.Count != resourceIds.Count)
                {
                    throw new Exception("One or more resource IDs are invalid.");
                }

                var taskResources = validResourceIds.Select(resourceId => new ProjectTask_Resource
                {
                    ProjectTaskId = projectTask.Id,
                    ProjectResourceId = resourceId
                }).ToList();

                await _context.ProjectTaskResources.AddRangeAsync(taskResources);
                await _context.SaveChangesAsync();
            }

            return await _context.ProjectTasks
                .Include(t => t.ProjectTaskCategory!)
                .Include(t => t.ProjectTaskResources!)
                .ThenInclude(tr => tr.ProjectResource!)
                .FirstOrDefaultAsync(t => t.Id == projectTask.Id);
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
                .Include(p => p.ProjectSubTasks)
                .Include(p => p.ProjectTaskComments)
                .Include(p => p.ProjectTaskResources)
                    .ThenInclude(r => r.ProjectResource)
                .FirstOrDefaultAsync(p => p.Id == id) ?? null!;
        }

        public async Task<List<ProjectTask>> GetProjectTasksAsync()
        {
            // Get all tasks
            var tasks = await _context.ProjectTasks
                .Include(p => p.ProjectTaskCategory)
                .ToListAsync();

            // Get all task resources
            var resources = await _context.ProjectTaskResources
                .Include(r => r.ProjectResource)
                .ToListAsync();

            // Create a dictionary to look up resources by task ID
            var resourcesByTaskId = resources
                .GroupBy(r => r.ProjectTaskId)
                .ToDictionary(g => g.Key, g => g.ToList());

            // Create new ProjectTask objects with resources manually assigned
            var result = tasks.Select(t => new ProjectTask
            {
                Id = t.Id,
                Name = t.Name,
                Description = t.Description,
                Status = t.Status,
                StartDate = t.StartDate,
                EndDate = t.EndDate,
                HasSubTasks = t.HasSubTasks,
                ProjectTaskCategoryId = t.ProjectTaskCategoryId,
                ProjectTaskCategory = t.ProjectTaskCategory,

                // Manually assign resources if they exist
                ProjectTaskResources = resourcesByTaskId.ContainsKey(t.Id)
                    ? resourcesByTaskId[t.Id]
                    : new List<ProjectTask_Resource>()
            }).ToList();

            return result;
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

            _context.ProjectTasks.Update(existingTask);
            await _context.SaveChangesAsync();
            return existingTask;
        }

        public async Task<ProjectTask> CompleteProjectTaskAsync(int id)
        {
            var projectTask = await _context.ProjectTasks.FirstOrDefaultAsync(t => t.Id == id);
            if (projectTask == null)
            {
                return null!;
            }
            projectTask.Status = ProjectTask.ProjectTaskStatus.Completed;
            _context.ProjectTasks.Update(projectTask);
            await _context.SaveChangesAsync();
            return projectTask;
        }
    }
}
