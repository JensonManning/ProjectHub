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
    public class TaskTypeRepoRepository : ITaskTypeRepoRepository
    {
        private readonly AppDbContext _context;
        public TaskTypeRepoRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<TaskTypeRepo>> GetTaskTypeReposAsync()
        {
            return await _context.TaskTypeRepo
            .Include(t => t.TaskRepos)
            .ToListAsync();
        }

        public async Task<TaskTypeRepo> GetTaskTypeRepoAsync(int id)
        {
            var type = await _context.TaskTypeRepo
            .Include(t => t.TaskRepos)
            .FirstOrDefaultAsync(t => t.Id == id);
            if (type == null)
            {
                throw new Exception("TaskTypeRepo not found");
            }
            return type;
        }

        public async Task<TaskTypeRepo> CreateTaskTypeRepoAsync(TaskTypeRepo taskTypeRepo)
        {
            if (taskTypeRepo == null)
            {
                throw new Exception("TaskTypeRepo cannot be null");
            }
            await _context.TaskTypeRepo.AddAsync(taskTypeRepo);
            await _context.SaveChangesAsync();
            return taskTypeRepo;
        }

        public async Task<TaskTypeRepo> DeleteTaskTypeRepoAsync(int id)
        {
            var type = await _context.TaskTypeRepo
            .Include(t => t.TaskRepos)
            .FirstOrDefaultAsync(t => t.Id == id);
            if (type == null)
            {
                throw new Exception("TaskTypeRepo not found");
            }
            _context.TaskTypeRepo.Remove(type);
            await _context.SaveChangesAsync();
            return type;
        }      

        public async Task<TaskTypeRepo> UpdateTaskTypeRepoAsync(int id, TaskTypeRepo taskTypeRepo)
        {
            if (taskTypeRepo == null)
            {
                throw new Exception("TaskTypeRepo cannot be null");
            }
            var type = await _context.TaskTypeRepo
            .Include(t => t.TaskRepos)
            .FirstOrDefaultAsync(t => t.Id == id);
            if (type == null)
            {
                throw new Exception("TaskTypeRepo not found");
            }
            type.Name = taskTypeRepo.Name;
            await _context.SaveChangesAsync();
            return type;
        }
    }
}