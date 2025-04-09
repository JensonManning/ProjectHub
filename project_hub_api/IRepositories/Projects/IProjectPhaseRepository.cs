using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using project_hub_api.Models.Projects.Phases;

namespace project_hub_api.IRepositories.Projects
{
    public interface IProjectPhaseRepository
    {
        public Task<List<ProjectPhase>> GetProjectPhasesAsync();
        public Task<ProjectPhase> GetProjectPhaseAsync(int id);
        public Task<ProjectPhase> AddProjectPhaseAsync(ProjectPhase projectPhase);
        public Task<ProjectPhase> UpdateProjectPhaseAsync(int id, ProjectPhase projectPhase);
        public Task<ProjectPhase> DeleteProjectPhaseAsync(int id);
    }
}