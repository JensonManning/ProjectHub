using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using project_hub_api.Data;
using project_hub_api.IRepositories.Users;
using project_hub_api.Models.Users;

namespace project_hub_api.Repositories.Users
{
    public class ProjectUserRepository : IProjectUserRepository
    {
        private readonly AppDbContext _context;

        public ProjectUserRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<ProjectUser>> GetProjectUsersAsync()
        {
            return await _context.ProjectUsers
            .Include(r => r.Role)
            .ToListAsync();
        }

        public async Task<ProjectUser> GetProjectUserAsync(string id)
        {
            return await _context.ProjectUsers
            .Include(r => r.Role!)
            .FirstOrDefaultAsync(r => r.Id == id);
        }

        public async Task<ProjectUser> AddProjectUserAsync(ProjectUser projectUser)
        {
            await _context.ProjectUsers.AddAsync(projectUser);
            await _context.SaveChangesAsync();
            return projectUser;
        }

        public async Task<ProjectUser> UpdateProjectUserAsync(string id, ProjectUser projectUser)
        {
            var user = await _context.ProjectUsers.FirstOrDefaultAsync(r => r.Id == id);
            if (user == null)
            {
                throw new Exception("User not found");
            }

            user.Name = projectUser.Name;
            user.Email = projectUser.Email;
            user.Phone = projectUser.Phone;
            user.RoleId = projectUser.RoleId;
            
            await _context.SaveChangesAsync();
            return projectUser;
        }
        
        public async Task<ProjectUser> DeleteProjectUserAsync(string id)
        {
            var projectUser = await _context.ProjectUsers.FindAsync(id);
            _context.ProjectUsers.Remove(projectUser);
            await _context.SaveChangesAsync();
            return projectUser;
        }

        
    }
}