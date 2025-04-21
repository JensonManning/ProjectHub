using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using project_hub_api.Data;
using project_hub_api.Models.Projects;
using project_hub_api.Models.Projects.Phases;
using project_hub_api.Models.Projects.Tasks;

namespace project_hub_api.Services
{
    public class ProjectStatusService
    {
        private readonly AppDbContext _context;
        private readonly ILogger<ProjectStatusService> _logger;

        public ProjectStatusService(AppDbContext context, ILogger<ProjectStatusService> logger)
        {
            _context = context;
            _logger = logger;
        }

        public async Task UpdateProjectStatuses()
        {
            _logger.LogInformation("Starting project status update process");
            
            var today = DateOnly.FromDateTime(DateTime.Today);
            await UpdateProjects(today);
            await UpdatePhases(today);
            
            await _context.SaveChangesAsync();
            
            _logger.LogInformation("Project status update process completed");
        }

        private async Task UpdateProjects(DateOnly today)
        {
            var projects = await _context.Projects.ToListAsync();
            
            foreach (var project in projects)
            {
                Project.ProjectStatus newStatus;
                
                if (today < project.StartDate)
                {
                    newStatus = Project.ProjectStatus.Upcoming;
                }
                else if (today > project.EndDate)
                {
                    newStatus = Project.ProjectStatus.Completed;
                }
                else
                {
                    newStatus = Project.ProjectStatus.Active;
                }
                
                if (project.Status != newStatus)
                {
                    _logger.LogInformation($"Updating project {project.Id} - {project.Name} status from {project.Status} to {newStatus}");
                    project.Status = newStatus;
                }
            }
        }

        private async Task UpdatePhases(DateOnly today)
        {
            var phases = await _context.ProjectPhases
                .Include(p => p.ProjectTasks)
                .ToListAsync();
            
            foreach (var phase in phases)
            {
                ProjectPhase.PhaseStatus newStatus;
                
                // Check if phase is within date range
                if (today < phase.StartDate)
                {
                    newStatus = ProjectPhase.PhaseStatus.Upcoming;
                }
                else if (today > phase.EndDate)
                {
                    newStatus = ProjectPhase.PhaseStatus.Completed;
                }
                else
                {
                    // Phase is in date range (this week)
                    newStatus = ProjectPhase.PhaseStatus.Active;
                    
                    // Check if all tasks are not closed
                    bool hasOpenTasks = phase.ProjectTasks.Any(t => t.Status != ProjectTask.ProjectTaskStatus.Completed && 
                                                                   t.Status != ProjectTask.ProjectTaskStatus.Cancelled);
                    
                    // If all tasks aren't closed, mark as late
                    if (hasOpenTasks)
                    {
                        newStatus = ProjectPhase.PhaseStatus.Late;
                        
                        // Update tasks within this phase to late as well
                        await UpdateTasksInPhaseToLate(phase.Id);
                    }
                }
                
                if (phase.Status != newStatus)
                {
                    _logger.LogInformation($"Updating phase {phase.Id} - {phase.Name} status from {phase.Status} to {newStatus}");
                    phase.Status = newStatus;
                }
            }
        }

        private async Task UpdateTasksInPhaseToLate(int phaseId)
        {
            var tasks = await _context.ProjectTasks
                .Where(t => t.ProjectPhaseId == phaseId)
                .ToListAsync();
            
            foreach (var task in tasks)
            {
                // Only update tasks that aren't already completed or cancelled
                if (task.Status != ProjectTask.ProjectTaskStatus.Completed && 
                    task.Status != ProjectTask.ProjectTaskStatus.Cancelled)
                {
                    _logger.LogInformation($"Marking task {task.Id} - {task.Name} as Late");
                    task.Status = ProjectTask.ProjectTaskStatus.Late;
                }
            }
        }
    }
} 