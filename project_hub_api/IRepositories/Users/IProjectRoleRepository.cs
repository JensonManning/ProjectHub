using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using project_hub_api.Models.Users;

namespace project_hub_api.IRepositories.Users
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