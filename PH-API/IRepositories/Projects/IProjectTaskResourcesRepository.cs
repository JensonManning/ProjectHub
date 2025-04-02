using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PH_API.Models.Projects.Tasks;

namespace PH_API.IRepositories.Projects
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