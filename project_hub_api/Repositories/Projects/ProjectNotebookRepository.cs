using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using project_hub_api.Data;
using project_hub_api.IRepositories.Projects;
using project_hub_api.Models.Projects.Notebooks;

namespace project_hub_api.Repositories.Projects
{
    public class ProjectNotebookRepository : IProjectNotebookRepository
    {
        private readonly AppDbContext _context;

        public ProjectNotebookRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<ProjectNotebook> AddProjectNotebookAsync(ProjectNotebook projectNotebook)
        {
            await _context.ProjectNotebooks.AddAsync(projectNotebook);
            await _context.SaveChangesAsync();
            return projectNotebook;
        }

        public async Task<ProjectNotebook> DeleteProjectNotebookAsync(int id)
        {
            var notebook = await _context.ProjectNotebooks.FindAsync(id);
            if (notebook == null)
            {
                return null!;
            }

            _context.ProjectNotebooks.Remove(notebook);
            await _context.SaveChangesAsync();
            return notebook;
        }

        public async Task<ProjectNotebook> GetProjectNotebookAsync(int id)
        {
            return await _context.ProjectNotebooks
                .Include(n => n.Project)
                .FirstOrDefaultAsync(n => n.Id == id) ?? null!;
        }

        public async Task<List<ProjectNotebook>> GetProjectNotebooksAsync()
        {
            return await _context.ProjectNotebooks
                .Include(n => n.Project)
                .ToListAsync();
        }

        public async Task<ProjectNotebook> UpdateProjectNotebookAsync(int id, ProjectNotebook projectNotebook)
        {
            var existingNotebook = await _context.ProjectNotebooks.FindAsync(id);
            if (existingNotebook == null)
            {
                return null!;
            }

            existingNotebook.Name = projectNotebook.Name;
            existingNotebook.Description = projectNotebook.Description;
            existingNotebook.Content = projectNotebook.Content;
            existingNotebook.UpdatedAt = DateTime.Now;
            existingNotebook.UpdatedBy = projectNotebook.UpdatedBy;
            existingNotebook.ProjectId = projectNotebook.ProjectId;

            _context.ProjectNotebooks.Update(existingNotebook);
            await _context.SaveChangesAsync();
            return existingNotebook;
        }
    }
}
