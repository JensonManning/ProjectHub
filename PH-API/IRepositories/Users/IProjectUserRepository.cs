using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PH_API.Models.Users;

namespace PH_API.IRepositories.Users
{
    public interface IProjectUserRepository
    {
        public Task<List<ProjectUser>> GetProjectUsersAsync();
        public Task<ProjectUser> GetProjectUserAsync(int id);
        public Task<ProjectUser> AddProjectUserAsync(ProjectUser projectUser);
        public Task<ProjectUser> UpdateProjectUserAsync(int id, ProjectUser projectUser);
        public Task<ProjectUser> DeleteProjectUserAsync(int id);
    }
}