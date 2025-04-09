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
    public class ProjectRoleRepository : IProjectRoleRepository
    {
        private readonly AppDbContext _context;

        public ProjectRoleRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<ProjectRole>> GetProjectRolesAsync()
        {
            return await _context.ProjectRoles
            .Include(u => u.ProjectUsers)
            .ToListAsync();
        }

        public async Task<ProjectRole> GetProjectRoleAsync(int id)
        {
            return await _context.ProjectRoles
            .Include(u => u.ProjectUsers)
            .FirstOrDefaultAsync(r => r.Id == id);
        }

        public async Task<ProjectRole> AddProjectRoleAsync(ProjectRole projectRole)
        {
            await _context.ProjectRoles.AddAsync(projectRole);
            await _context.SaveChangesAsync();
            return projectRole;
        }

        public async Task<ProjectRole> UpdateProjectRoleAsync(int id, ProjectRole projectRole)
        {
            var role = await _context.ProjectRoles.FirstOrDefaultAsync(r => r.Id == id);
            if (role == null)
            {
                throw new Exception("Role not found");
            }
            role.Name = projectRole.Name;

            await _context.SaveChangesAsync();
            return projectRole;
        }   

        public async Task<ProjectRole> DeleteProjectRoleAsync(int id)
        {
            var projectRole = await _context.ProjectRoles.FindAsync(id);
            _context.ProjectRoles.Remove(projectRole);
            await _context.SaveChangesAsync();
            return projectRole;
        }
    }
}