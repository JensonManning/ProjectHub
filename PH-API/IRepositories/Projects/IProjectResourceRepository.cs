using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PH_API.Models.Projects.Resources;

namespace PH_API.IRepositories.Projects
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