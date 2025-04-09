using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using project_hub_api.Models.Projects.Tasks;
using project_hub_api.Models.Repo;

namespace project_hub_api.IRepositories.Projects
{
    public interface IProjectTaskTypeRepository
    {
        public Task<List<TaskTypeRepo>> GetProjectTaskTypesAsync();
        public Task<TaskTypeRepo> GetProjectTaskTypeAsync(int id);
        public Task<TaskTypeRepo> AddProjectTaskTypeAsync(TaskTypeRepo projectTaskType);
        public Task<TaskTypeRepo> UpdateProjectTaskTypeAsync(int id, TaskTypeRepo projectTaskType);
        public Task<TaskTypeRepo> DeleteProjectTaskTypeAsync(int id);
    }
}