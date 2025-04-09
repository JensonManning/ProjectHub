using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using project_hub_api.Models.Projects.Tasks;

namespace project_hub_api.IRepositories.Projects
{
    public interface IProjectTaskResourcesRepository
    {
        public Task<List<ProjectTask_Resource>> GetProjectTaskResourcesAsync();
        public Task<ProjectTask_Resource> GetProjectTaskResourceAsync(int id);
        public Task<ProjectTask_Resource> AddProjectTaskResourceAsync(ProjectTask_Resource projectTaskResource);
        public Task<ProjectTask_Resource> UpdateProjectTaskResourceAsync(int id, ProjectTask_Resource projectTaskResource);
        public Task<ProjectTask_Resource> DeleteProjectTaskResourceAsync(int id);
    }
}