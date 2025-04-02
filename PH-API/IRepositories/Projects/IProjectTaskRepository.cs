using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PH_API.Models.Projects.Tasks;

namespace PH_API.IRepositories.Projects
{
    public interface IProjectTaskRepository
    {
        public Task<List<ProjectTask>> GetProjectTasksAsync();
        public Task<ProjectTask> GetProjectTaskAsync(int id);
        public Task<ProjectTask> AddProjectTaskAsync(ProjectTask projectTask);
        public Task<ProjectTask> UpdateProjectTaskAsync(int id, ProjectTask projectTask);
        public Task<ProjectTask> DeleteProjectTaskAsync(int id);
    }
}