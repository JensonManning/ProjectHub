using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using project_hub_api.Models.Users;

namespace project_hub_api.IRepositories.Users
{
    public interface IProjectUserRepository
    {
        public Task<List<ProjectUser>> GetProjectUsersAsync();
        public Task<ProjectUser> GetProjectUserAsync(string id);
        public Task<ProjectUser> AddProjectUserAsync(ProjectUser projectUser);
        public Task<ProjectUser> UpdateProjectUserAsync(string id, ProjectUser projectUser);
        public Task<ProjectUser> DeleteProjectUserAsync(string id);
    }
}