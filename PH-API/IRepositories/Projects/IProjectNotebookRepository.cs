using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PH_API.Models.Projects.Notebooks;

namespace PH_API.IRepositories.Projects
{
    public interface IProjectNotebookRepository
    {
        public Task<List<ProjectNotebook>> GetProjectNotebooksAsync();
        public Task<ProjectNotebook> GetProjectNotebookAsync(int id);
        public Task<ProjectNotebook> AddProjectNotebookAsync(ProjectNotebook projectNotebook);
        public Task<ProjectNotebook> UpdateProjectNotebookAsync(int id, ProjectNotebook projectNotebook);
        public Task<ProjectNotebook> DeleteProjectNotebookAsync(int id);
    }
}