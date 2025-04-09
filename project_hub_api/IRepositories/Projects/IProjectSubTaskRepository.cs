using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using project_hub_api.Models.Projects.Tasks;

namespace project_hub_api.IRepositories.Projects
{
    public interface IProjectSubTaskRepository
    {
        public Task<List<ProjectSubTask>> GetProjectSubTasksAsync();
        public Task<ProjectSubTask> GetProjectSubTaskAsync(int id);
        public Task<ProjectSubTask> AddProjectSubTaskAsync(ProjectSubTask projectSubTask);
        public Task<ProjectSubTask> UpdateProjectSubTaskAsync(int id, ProjectSubTask projectSubTask);
        public Task<ProjectSubTask> DeleteProjectSubTaskAsync(int id);
    }
}