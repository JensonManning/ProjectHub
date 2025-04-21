using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using project_hub_api.Data;
using project_hub_api.IRepositories.Repos;
using project_hub_api.Models.Repo;

namespace project_hub_api.Repositories.Repos
{
    public class TaskRepoRepository : ITaskRepoRepository
    {
        private readonly AppDbContext _context;
        public TaskRepoRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<TaskRepo>> GetTaskReposAsync()
        {
            // First get the raw data with all includes
            var tasks = await _context.TaskRepo
                .Include(x => x.SubTaskRepo!)
                .Include(x => x.TaskRepoResources!)
                .ThenInclude(x => x.ResourceRepo!)
                .Include(x => x.CategoryRepo!)
                .Include(x => x.TaskTypeRepo!)
                .ToListAsync();

            // Return the tasks with properly mapped relationships
            return tasks.Select(t => new TaskRepo
            {
                Id = t.Id,
                Name = t.Name,
                Description = t.Description,
                HasSubTaskRepo = t.HasSubTaskRepo,
                CategoryRepoId = t.CategoryRepoId,
                PhaseOrder = t.PhaseOrder,
                CategoryRepo = t.CategoryRepo != null ? new CategoryRepo 
                { 
                    Id = t.CategoryRepo.Id, 
                    Name = t.CategoryRepo.Name 
                } : null,
                TaskTypeRepoId = t.TaskTypeRepoId,
                TaskTypeRepo = t.TaskTypeRepo != null ? new TaskTypeRepo 
                {
                    Id = t.TaskTypeRepo.Id,
                    Name = t.TaskTypeRepo.Name
                } : null,
                TaskRepoResources = t.TaskRepoResources?.Select(tr => new TaskRepo_ResourceRepo
                {
                    TaskRepoId = tr.TaskRepoId,
                    ResourceRepoId = tr.ResourceRepoId,
                    ResourceRepo = tr.ResourceRepo
                }).ToList(),
                SubTaskRepo = t.SubTaskRepo.Select(s => new SubTaskRepo
                {
                    Id = s.Id,
                    Name = s.Name,
                    Description = s.Description
                }).ToList()
            }).ToList();
        }

        public async Task<TaskRepo> GetTaskRepoAsync(int id)
        {
            // First get the raw data with all includes
            var task = await _context.TaskRepo
                .Include(x => x.SubTaskRepo!)
                .Include(x => x.TaskRepoResources!)
                .ThenInclude(x => x.ResourceRepo!)
                .Include(x => x.CategoryRepo!)
                .Include(x => x.TaskTypeRepo!)
                .FirstOrDefaultAsync(x => x.Id == id);

            if (task == null)
            {
                return null;
            }

            // Return the task with properly mapped relationships
            return new TaskRepo
            {
                Id = task.Id,
                Name = task.Name,
                Description = task.Description,
                HasSubTaskRepo = task.HasSubTaskRepo,
                CategoryRepoId = task.CategoryRepoId,
                PhaseOrder = task.PhaseOrder,
                CategoryRepo = task.CategoryRepo != null ? new CategoryRepo 
                { 
                    Id = task.CategoryRepo.Id, 
                    Name = task.CategoryRepo.Name 
                } : null,
                TaskTypeRepoId = task.TaskTypeRepoId,
                TaskTypeRepo = task.TaskTypeRepo != null ? new TaskTypeRepo 
                {
                    Id = task.TaskTypeRepo.Id,
                    Name = task.TaskTypeRepo.Name
                } : null,
                TaskRepoResources = task.TaskRepoResources.Select(tr => new TaskRepo_ResourceRepo
                {
                    TaskRepoId = tr.TaskRepoId,
                    ResourceRepoId = tr.ResourceRepoId,
                    ResourceRepo = tr.ResourceRepo
                }).ToList(),
                SubTaskRepo = task.SubTaskRepo.Select(s => new SubTaskRepo
                {
                    Id = s.Id,
                    Name = s.Name,
                    Description = s.Description
                }).ToList()
            };
        }

        public async Task<TaskRepo> AddTaskRepoAsync(TaskRepo taskRepo, List<int> resourceIds)
        {
            await _context.TaskRepo.AddAsync(taskRepo);
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

                var taskResources = validResourceIds.Select(resourceId => new TaskRepo_ResourceRepo 
                {
                    TaskRepoId = taskRepo.Id,
                    ResourceRepoId = resourceId
                }).ToList();
                
                await _context.TaskRepoResources.AddRangeAsync(taskResources);
                await _context.SaveChangesAsync();
            }

            return await _context.TaskRepo
                .Include(t => t.CategoryRepo!)
                .Include(t => t.TaskTypeRepo!)
                .Include(t => t.TaskRepoResources!)
                .ThenInclude(tr => tr.ResourceRepo!) 
                .FirstOrDefaultAsync(t => t.Id == taskRepo.Id);
        }

        public async Task<TaskRepo> UpdateTaskRepoAsync(int id, TaskRepo updatedTask)
        {
            var existingTask = await _context.TaskRepo
                .Include(x => x.SubTaskRepo!)
                .Include(x => x.TaskRepoResources!)
                .ThenInclude(x => x.ResourceRepo!)
                .Include(x => x.CategoryRepo!)
                .Include(x => x.TaskTypeRepo!)
                .FirstOrDefaultAsync(x => x.Id == id);

            if (existingTask == null)
            {
                throw new Exception("TaskRepo not found");
            }

            // Update properties
            existingTask.Name = updatedTask.Name;
            existingTask.Description = updatedTask.Description;
            existingTask.PhaseOrder = updatedTask.PhaseOrder;
            existingTask.HasSubTaskRepo = updatedTask.HasSubTaskRepo;
            existingTask.CategoryRepoId = updatedTask.CategoryRepoId;
            existingTask.TaskTypeRepoId = updatedTask.TaskTypeRepoId;
            
            // Update resources if they exist in the updated task
            if (updatedTask.TaskRepoResources != null)
            {
                // Clear existing resources
                existingTask.TaskRepoResources.Clear();
                // Add new resources
                foreach (var resource in updatedTask.TaskRepoResources)
                {
                    existingTask.TaskRepoResources.Add(resource);
                }
            }
            
            await _context.SaveChangesAsync();
            return existingTask;
        }

        public async Task<TaskRepo> DeleteTaskRepoAsync(int id)
        {
            var taskRepo = await _context.TaskRepo.FindAsync(id);
            if (taskRepo == null)
            {
                throw new Exception("TaskRepo not found");
            }
            _context.TaskRepo.Remove(taskRepo);
            await _context.SaveChangesAsync();
            return taskRepo;
        }
    }
}