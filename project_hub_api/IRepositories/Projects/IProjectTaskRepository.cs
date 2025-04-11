using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using project_hub_api.Models.Projects.Tasks;

namespace project_hub_api.IRepositories.Projects
{
    public interface IProjectTaskRepository
    {
        public Task<List<ProjectTask>> GetProjectTasksAsync();
        public Task<ProjectTask> GetProjectTaskAsync(int id);
        public Task<ProjectTask> AddProjectTaskAsync(ProjectTask projectTask, List<int> resourceIds);
        public Task<ProjectTask> UpdateProjectTaskAsync(int id, ProjectTask projectTask);
        public Task<ProjectTask> DeleteProjectTaskAsync(int id);
        public Task<ProjectTask> CompleteProjectTaskAsync(int id);
    }
}