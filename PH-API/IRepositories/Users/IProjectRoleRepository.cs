using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PH_API.Models.Users;

namespace PH_API.IRepositories.Users
{
    public interface IProjectRoleRepository
    {
        public Task<List<ProjectRole>> GetProjectRolesAsync();
        public Task<ProjectRole> GetProjectRoleAsync(int id);
        public Task<ProjectRole> AddProjectRoleAsync(ProjectRole projectRole);
        public Task<ProjectRole> UpdateProjectRoleAsync(int id, ProjectRole projectRole);
        public Task<ProjectRole> DeleteProjectRoleAsync(int id);
    }
}