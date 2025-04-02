using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PH_API.Models.Projects.Tasks;

namespace PH_API.IRepositories.Projects
{
    public interface IProjectTaskTypeRepository
    {
        public Task<List<ProjectTaskType>> GetProjectTaskTypesAsync();
        public Task<ProjectTaskType> GetProjectTaskTypeAsync(int id);
        public Task<ProjectTaskType> AddProjectTaskTypeAsync(ProjectTaskType projectTaskType);
        public Task<ProjectTaskType> UpdateProjectTaskTypeAsync(int id, ProjectTaskType projectTaskType);
        public Task<ProjectTaskType> DeleteProjectTaskTypeAsync(int id);
    }
}