using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using project_hub_api.Models.Projects.Tasks;

namespace project_hub_api.IRepositories.Projects
{
    public interface IProjectTaskCategoryRepository
    {
        public Task<List<ProjectTaskCategory>> GetProjectTaskCategoriesAsync();
        public Task<ProjectTaskCategory> GetProjectTaskCategoryAsync(int id);
        public Task<ProjectTaskCategory> AddProjectTaskCategoryAsync(ProjectTaskCategory projectTaskCategory);
        public Task<ProjectTaskCategory> UpdateProjectTaskCategoryAsync(int id, ProjectTaskCategory projectTaskCategory);
        public Task<ProjectTaskCategory> DeleteProjectTaskCategoryAsync(int id);
    }
}