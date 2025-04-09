using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using project_hub_api.Models.Repo;

namespace project_hub_api.IRepositories.Repos
{
    public interface IPhaseRepoRepository
    {
        public Task<List<PhaseRepo>> GetPhaseReposAsync();
        public Task<PhaseRepo> GetPhaseRepoAsync(int id);
        public Task<PhaseRepo> AddPhaseRepoAsync(PhaseRepo phaseRepo);
        public Task<PhaseRepo> UpdatePhaseRepoAsync(int id,PhaseRepo phaseRepo);
        public Task<PhaseRepo> DeletePhaseRepoAsync(int id);
    }
}