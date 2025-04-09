using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using project_hub_api.Models.Repo;

namespace project_hub_api.IRepositories.Repos
{
    public interface IResourceRepoRepository
    {
        public Task<List<ResourceRepo>> GetResourceReposAsync();
        public Task<ResourceRepo> GetResourceRepoAsync(int id);
        public Task<ResourceRepo> AddResourceRepoAsync(ResourceRepo resourceRepo);
        public Task<ResourceRepo> UpdateResourceRepoAsync(int id, ResourceRepo resourceRepo);
        public Task<ResourceRepo> DeleteResourceRepoAsync(int id);
    }
}