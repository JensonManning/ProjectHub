using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PH_API.Models.Projects.Tasks;

namespace PH_API.IRepositories.Projects
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