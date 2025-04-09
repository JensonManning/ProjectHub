using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using project_hub_api.Models.Projects.Tasks;

namespace project_hub_api.IRepositories.Projects
{
    public interface IProjectTaskCommentRepository
    {
        public Task<List<ProjectTaskComment>> GetProjectTaskCommentsAsync();
        public Task<ProjectTaskComment> GetProjectTaskCommentAsync(int id);
        public Task<ProjectTaskComment> AddProjectTaskCommentAsync(ProjectTaskComment projectTaskComment);
        public Task<ProjectTaskComment> UpdateProjectTaskCommentAsync(int id, ProjectTaskComment projectTaskComment);
        public Task<ProjectTaskComment> DeleteProjectTaskCommentAsync(int id);
    }
}