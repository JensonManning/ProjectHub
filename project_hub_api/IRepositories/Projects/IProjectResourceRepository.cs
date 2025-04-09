using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using project_hub_api.Models.Projects.Resources;

namespace project_hub_api.IRepositories.Projects
{
    public interface IProjectResourceRepository
    {
        public Task<List<ProjectResource>> GetProjectResourcesAsync();
        public Task<ProjectResource?> GetProjectResourceAsync(int id);
        public Task<ProjectResource> AddProjectResourceAsync(ProjectResource projectResource);
        public Task<ProjectResource?> UpdateProjectResourceAsync(int id, ProjectResource projectResource);
        public Task<ProjectResource?> DeleteProjectResourceAsync(int id);
    }
}