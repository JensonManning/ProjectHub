using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using project_hub_api.Data;
using project_hub_api.IRepositories.Projects;
using project_hub_api.Models.Projects.Phases;

namespace project_hub_api.Repositories.Projects
{
    public class ProjectPhaseRepository : IProjectPhaseRepository
    {
        private readonly AppDbContext _context;

        public ProjectPhaseRepository(AppDbContext context)
        {
            _context = context;
        }

        public async Task<ProjectPhase> AddProjectPhaseAsync(ProjectPhase projectPhase)
        {
            await _context.ProjectPhases.AddAsync(projectPhase);
            await _context.SaveChangesAsync();
            return projectPhase;
        }

        public async Task<ProjectPhase> DeleteProjectPhaseAsync(int id)
        {
            var phase = await _context.ProjectPhases.FindAsync(id);
            if (phase == null)
            {
                return null!;
            }

            _context.ProjectPhases.Remove(phase);
            await _context.SaveChangesAsync();
            return phase;
        }

        public async Task<ProjectPhase> GetProjectPhaseAsync(int id)
        {
            return await _context.ProjectPhases
                .Include(p => p.Project)
                .Include(p => p.ProjectTasks)
                .Include(p => p.ProjectTaskCategories)
                .FirstOrDefaultAsync(p => p.Id == id) ?? null!;
        }

        public async Task<List<ProjectPhase>> GetProjectPhasesAsync()
        {
            return await _context.ProjectPhases
                .Include(p => p.Project)
                .Include(p => p.ProjectTasks)
                .Include(p => p.ProjectTaskCategories)
                .ToListAsync();
        }

        public async Task<ProjectPhase> UpdateProjectPhaseAsync(int id, ProjectPhase projectPhase)
        {
            var existingPhase = await _context.ProjectPhases.FindAsync(id);
            if (existingPhase == null)
            {
                return null!;
            }

            existingPhase.Name = projectPhase.Name;
            existingPhase.Description = projectPhase.Description;
            existingPhase.StartDate = projectPhase.StartDate;
            existingPhase.EndDate = projectPhase.EndDate;
            existingPhase.Order = projectPhase.Order;
            existingPhase.Status = projectPhase.Status;
            existingPhase.ProjectId = projectPhase.ProjectId;

            _context.ProjectPhases.Update(existingPhase);
            await _context.SaveChangesAsync();
            return existingPhase;
        }
    }
}
