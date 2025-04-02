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
    public class ProjectSubTaskRepository : IProjectSubTaskRepository
    {
        private readonly AppDbContext _context;

        public ProjectSubTaskRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<ProjectSubTask> AddProjectSubTaskAsync(ProjectSubTask projectSubTask)
        {
            await _context.ProjectSubTasks.AddAsync(projectSubTask);
            await _context.SaveChangesAsync();
            return projectSubTask;
        }

        public async Task<ProjectSubTask> DeleteProjectSubTaskAsync(int id)
        {
            var subTask = await _context.ProjectSubTasks.FindAsync(id);
            if (subTask == null)
            {
                return null!;
            }

            _context.ProjectSubTasks.Remove(subTask);
            await _context.SaveChangesAsync();
            return subTask;
        }

        public async Task<ProjectSubTask> GetProjectSubTaskAsync(int id)
        {
            return await _context.ProjectSubTasks
                .Include(s => s.ProjectTask)
                .FirstOrDefaultAsync(s => s.Id == id) ?? null!;
        }

        public async Task<List<ProjectSubTask>> GetProjectSubTasksAsync()
        {
            return await _context.ProjectSubTasks
                .Include(s => s.ProjectTask)
                .ToListAsync();
        }

        public async Task<ProjectSubTask> UpdateProjectSubTaskAsync(int id, ProjectSubTask projectSubTask)
        {
            var existingSubTask = await _context.ProjectSubTasks.FindAsync(id);
            if (existingSubTask == null)
            {
                return null!;
            }

            existingSubTask.Name = projectSubTask.Name;
            existingSubTask.Description = projectSubTask.Description;
            existingSubTask.Status = projectSubTask.Status;
            existingSubTask.StartDate = projectSubTask.StartDate;
            existingSubTask.EndDate = projectSubTask.EndDate;
            existingSubTask.ProjectTaskId = projectSubTask.ProjectTaskId;

            _context.ProjectSubTasks.Update(existingSubTask);
            await _context.SaveChangesAsync();
            return existingSubTask;
        }
    }
}
