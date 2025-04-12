using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using project_hub_api.Models.Projects;

namespace project_hub_api.IRepositories.Projects
{
    public interface IProjectRepository
    {
        public Task<List<Project>> GetProjectsAsync();
        public Task<Project> GetProjectAsync(int id);
        public Task<Project> AddProjectAsync(Project project);
        public Task<Project> UpdateProjectAsync(int id, Project project);
        public Task<Project> DeleteProjectAsync(int id);
        public Task<List<Project>> GetAllUserProjectsAsync();
    }
}