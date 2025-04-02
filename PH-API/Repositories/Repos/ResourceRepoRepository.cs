using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using PH_API.Data;
using PH_API.IRepositories.Repos;
using PH_API.Models.Repo;

namespace PH_API.Repositories.Repos
{
    public class ResourceRepoRepository : IResourceRepoRepository
    {
        private readonly AppDbContext _context;
        public ResourceRepoRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<List<ResourceRepo>> GetResourceReposAsync()
        {
            return await _context.ResourceRepo.ToListAsync();
        }

        public async Task<ResourceRepo> GetResourceRepoAsync(int id)
        {
            var resourceRepo = await _context.ResourceRepo.FirstOrDefaultAsync(r => r.Id == id);
            if (resourceRepo == null)
            {
                throw new Exception("ResourceRepo not found");
            }
            return resourceRepo;
        }

        public async Task<ResourceRepo> AddResourceRepoAsync(ResourceRepo resourceRepo)
        {
            await _context.ResourceRepo.AddAsync(resourceRepo);
            await _context.SaveChangesAsync();
            return resourceRepo;
        }

        public async Task<ResourceRepo> UpdateResourceRepoAsync(int id, ResourceRepo resourceRepo)
        {
            var resource = await _context.ResourceRepo.FirstOrDefaultAsync(r => r.Id == id);
            if (resource == null)
            {
                throw new Exception("ResourceRepo not found");
            }
            _context.ResourceRepo.Update(resourceRepo);
            await _context.SaveChangesAsync();

            var taskResourceRepo = await _context.TaskRepoResources.FirstOrDefaultAsync(r => r.ResourceRepoId == id);
            if (taskResourceRepo != null)
            {
                taskResourceRepo.ResourceRepoName = resourceRepo.Name;
                taskResourceRepo.ResourceRepoId = resourceRepo.Id;
                _context.TaskRepoResources.Update(taskResourceRepo);
                await _context.SaveChangesAsync();
            }
            return resourceRepo;
        }

        public async Task<ResourceRepo> DeleteResourceRepoAsync(int id)
        {
            var resourceRepo = await _context.ResourceRepo.FindAsync(id);
            if (resourceRepo == null)
            {
                throw new Exception("ResourceRepo not found");
            }
            _context.ResourceRepo.Remove(resourceRepo);
            await _context.SaveChangesAsync();
            return resourceRepo;
        }
    }
}