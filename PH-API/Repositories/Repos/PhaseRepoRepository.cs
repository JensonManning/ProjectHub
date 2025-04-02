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
    public class PhaseRepoRepository : IPhaseRepoRepository
    {
        private readonly AppDbContext _context;
        public PhaseRepoRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<PhaseRepo> GetPhaseRepoAsync(int id)
        {
            var phaseRepo = await _context.PhaseRepo.FirstOrDefaultAsync(x => x.Id == id);
            if (phaseRepo == null)
            {
                throw new Exception("PhaseRepo not found");
            }
            return phaseRepo; 
        }

        public async Task<List<PhaseRepo>> GetPhaseReposAsync()
        {
            return await _context.PhaseRepo.ToListAsync();
        }

        public async Task<PhaseRepo> AddPhaseRepoAsync(PhaseRepo phaseRepo)
        {
            await _context.PhaseRepo.AddAsync(phaseRepo);
            await _context.SaveChangesAsync();
            return phaseRepo;
        }

        public async Task<PhaseRepo> DeletePhaseRepoAsync(int id)
        {
            var phaseRepo = await _context.PhaseRepo.FindAsync(id);
            if (phaseRepo == null)
            {
                throw new Exception("PhaseRepo not found");
            }
            _context.PhaseRepo.Remove(phaseRepo);
            await _context.SaveChangesAsync();
            return phaseRepo;
        }
        
        public async Task<PhaseRepo> UpdatePhaseRepoAsync(int id, PhaseRepo phaseRepo)
        {
            var phase = await _context.PhaseRepo.FirstOrDefaultAsync(x => x.Id == id);
            if (phase == null)
            {
                throw new Exception("PhaseRepo not found");
            }
            _context.PhaseRepo.Update(phaseRepo);
            await _context.SaveChangesAsync();
            return phaseRepo;
        }
    }
}