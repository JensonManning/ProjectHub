using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PH_API.Models.Projects.Tasks;

namespace PH_API.IRepositories.Projects
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