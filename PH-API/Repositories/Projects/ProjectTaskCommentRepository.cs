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
    public class ProjectTaskCommentRepository : IProjectTaskCommentRepository
    {
        private readonly AppDbContext _context;

        public ProjectTaskCommentRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<ProjectTaskComment> AddProjectTaskCommentAsync(ProjectTaskComment projectTaskComment)
        {
            await _context.ProjectTaskComments.AddAsync(projectTaskComment);
            await _context.SaveChangesAsync();
            return projectTaskComment;
        }

        public async Task<ProjectTaskComment> DeleteProjectTaskCommentAsync(int id)
        {
            var comment = await _context.ProjectTaskComments.FindAsync(id);
            if (comment == null)
            {
                return null!;
            }

            _context.ProjectTaskComments.Remove(comment);
            await _context.SaveChangesAsync();
            return comment;
        }

        public async Task<ProjectTaskComment> GetProjectTaskCommentAsync(int id)
        {
            return await _context.ProjectTaskComments
                .Include(c => c.ProjectTask)
                .FirstOrDefaultAsync(c => c.Id == id) ?? null!;
        }

        public async Task<List<ProjectTaskComment>> GetProjectTaskCommentsAsync()
        {
            return await _context.ProjectTaskComments
                .Include(c => c.ProjectTask)
                .ToListAsync();
        }

        public async Task<ProjectTaskComment> UpdateProjectTaskCommentAsync(int id, ProjectTaskComment projectTaskComment)
        {
            var existingComment = await _context.ProjectTaskComments.FindAsync(id);
            if (existingComment == null)
            {
                return null!;
            }

            existingComment.Content = projectTaskComment.Content;
            existingComment.CommentDate = projectTaskComment.CommentDate;
            existingComment.CommentBy = projectTaskComment.CommentBy;

            _context.ProjectTaskComments.Update(existingComment);
            await _context.SaveChangesAsync();
            return existingComment;
        }
    }
}
