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
    public class ProjectTaskCategoryRepository : IProjectTaskCategoryRepository
    {
        private readonly AppDbContext _context;

        public ProjectTaskCategoryRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<ProjectTaskCategory> AddProjectTaskCategoryAsync(ProjectTaskCategory projectTaskCategory)
        {
            await _context.ProjectTaskCategories.AddAsync(projectTaskCategory);
            await _context.SaveChangesAsync();
            return projectTaskCategory;
        }

        public async Task<ProjectTaskCategory> DeleteProjectTaskCategoryAsync(int id)
        {
            var category = await _context.ProjectTaskCategories.FindAsync(id);
            if (category == null)
            {
                return null!;
            }

            _context.ProjectTaskCategories.Remove(category);
            await _context.SaveChangesAsync();
            return category;
        }

        public async Task<ProjectTaskCategory> GetProjectTaskCategoryAsync(int id)
        {
            return await _context.ProjectTaskCategories
                .Include(c => c.ProjectTasks)
                .FirstOrDefaultAsync(c => c.Id == id) ?? null!;
        }

        public async Task<List<ProjectTaskCategory>> GetProjectTaskCategoriesAsync()
        {
            return await _context.ProjectTaskCategories
                .Include(c => c.ProjectTasks)
                .ToListAsync();
        }

        public async Task<ProjectTaskCategory> UpdateProjectTaskCategoryAsync(int id, ProjectTaskCategory projectTaskCategory)
        {
            var existingCategory = await _context.ProjectTaskCategories.FindAsync(id);
            if (existingCategory == null)
            {
                return null!;
            }

            existingCategory.Name = projectTaskCategory.Name;
            existingCategory.Description = projectTaskCategory.Description;

            _context.ProjectTaskCategories.Update(existingCategory);
            await _context.SaveChangesAsync();
            return existingCategory;
        }
    }
}
