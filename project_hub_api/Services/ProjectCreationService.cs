using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using project_hub_api.Data;
using project_hub_api.Dtos.Projects; // Assuming CompleteProjectDto is here
// Add other necessary DTOs and Models using statements
using project_hub_api.Models.Projects;
using project_hub_api.Models.Projects.Notebooks;
using project_hub_api.Models.Projects.Phases;
using project_hub_api.Models.Projects.Resources;
using project_hub_api.Models.Projects.Tasks;

namespace project_hub_api.Services
{
    public class ProjectCreationService
    {
        private readonly AppDbContext _context;
        private readonly ILogger<ProjectCreationService> _logger;

        public ProjectCreationService(AppDbContext context, ILogger<ProjectCreationService> logger)
        {
            _context = context ?? throw new ArgumentNullException(nameof(context));
            _logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        public async Task<Project> CreateCompleteProjectAsync(CompleteProjectDto completeProject)
        {
            if (completeProject == null)
            {
                throw new ArgumentNullException(nameof(completeProject));
            }

            _logger.LogInformation("Starting complete project creation for: {ProjectName}", completeProject.Name);

            using var transaction = await _context.Database.BeginTransactionAsync();

            try
            {
                // STEP 1: Create the base project
                var project = new Project
                {
                    Name = completeProject.Name,
                    Description = completeProject.Description,
                    StartDate = completeProject.StartDate,
                    EndDate = completeProject.EndDate,
                    Status = completeProject.Status,
                    Type = completeProject.Type,
                    // Initialize collections
                    ProjectPhases = new List<ProjectPhase>(),
                    ProjectNotebooks = new List<ProjectNotebook>(),
                    ProjectResources = new List<ProjectResource>()
                };

                await _context.Projects.AddAsync(project);
                await _context.SaveChangesAsync(); // Project gets its ID
                _logger.LogInformation("Base project '{ProjectName}' created with ID: {ProjectId}", project.Name, project.Id);

                // STEP 2: Add Notebooks
                if (completeProject.Notebooks?.Any() == true)
                {
                    _logger.LogInformation("Adding {NotebookCount} notebooks to project {ProjectId}", completeProject.Notebooks.Count, project.Id);
                    foreach (var notebookDto in completeProject.Notebooks)
                    {
                        var notebook = new ProjectNotebook
                        {
                            Name = notebookDto.Name,
                            Description = notebookDto.Description,
                            Content = notebookDto.Content,
                            ProjectId = project.Id // Link to the project
                        };
                        await _context.ProjectNotebooks.AddAsync(notebook);
                    }
                    await _context.SaveChangesAsync();
                }

                // STEP 3: Add Resources and store their new IDs
                var createdProjectResources = new List<ProjectResource>();
                if (completeProject.Resources?.Any() == true)
                {
                    _logger.LogInformation("Adding {ResourceCount} resources to project {ProjectId}", completeProject.Resources.Count, project.Id);
                    foreach (var resourceDto in completeProject.Resources)
                    {
                        // Here, map resourceDto info (like UserId?) to actual user if needed, or handle as defined
                        var resource = new ProjectResource
                        {
                            Name = resourceDto.Name,
                            Description = resourceDto.Description,
                            ProjectId = project.Id, // Link to the project
                            UserId = resourceDto.UserId // Assuming UserId is the correct property based on fakedata
                        };
                        await _context.ProjectResources.AddAsync(resource);
                        createdProjectResources.Add(resource); // Add to list before saving
                    }
                    await _context.SaveChangesAsync(); // Resources get their IDs
                    _logger.LogInformation("Created {ResourceCount} resources for project {ProjectId}", createdProjectResources.Count, project.Id);
                }

                // STEP 4: Add Phases with Categories, Tasks, Subtasks, and TaskResources
                if (completeProject.Phases?.Any() == true)
                {
                    _logger.LogInformation("Adding {PhaseCount} phases to project {ProjectId}", completeProject.Phases.Count, project.Id);
                    foreach (var phaseDto in completeProject.Phases.OrderBy(p => p.Order)) // Process in order
                    {
                        // Create the phase
                        var phase = new ProjectPhase
                        {
                            Name = phaseDto.Name,
                            Description = phaseDto.Description,
                            Order = phaseDto.Order,
                            StartDate = phaseDto.StartDate,
                            EndDate = phaseDto.EndDate,
                            Status = phaseDto.Status,
                            ProjectId = project.Id, // Link to the project
                            // Initialize collections
                            ProjectTaskCategories = new List<ProjectTaskCategory>(),
                            ProjectTasks = new List<ProjectTask>()
                        };

                        // Add phase to project's collection *before* saving context
                        // project.ProjectPhases.Add(phase); // EF Core tracks relationships automatically when ProjectId is set

                        await _context.ProjectPhases.AddAsync(phase);
                        await _context.SaveChangesAsync(); // Phase gets its ID
                        _logger.LogInformation("Created phase '{PhaseName}' (ID: {PhaseId}) for project {ProjectId}", phase.Name, phase.Id, project.Id);

                        // STEP 4a: Add Categories for this phase & Map IDs
                        var categoryRepoIdToNewIdMap = new Dictionary<int, int>();
                        if (phaseDto.TaskCategories?.Any() == true)
                        {
                            _logger.LogInformation("Adding {CategoryCount} categories to phase {PhaseId}", phaseDto.TaskCategories.Count, phase.Id);
                            foreach (var categoryDto in phaseDto.TaskCategories)
                            {
                                var category = new ProjectTaskCategory
                                {
                                    Name = categoryDto.Name,
                                    Description = categoryDto.Description,
                                    ProjectPhaseId = phase.Id // Link to the phase
                                };
                                await _context.ProjectTaskCategories.AddAsync(category);
                                // Add category to phase's collection *before* saving context if desired
                                // phase.ProjectTaskCategories.Add(category);

                                await _context.SaveChangesAsync(); // Category gets its ID

                                // Map original DTO ID (repo ID) to the new database ID
                                if (categoryDto.Id > 0) // Assuming Id holds the repo ID from fakedata.json
                                {
                                    categoryRepoIdToNewIdMap[categoryDto.Id] = category.Id;
                                    _logger.LogInformation("Mapped Category Repo ID {RepoId} to New DB ID {NewId} for phase {PhaseId}", categoryDto.Id, category.Id, phase.Id);
                                }
                                else
                                {
                                    _logger.LogWarning("Category DTO '{CategoryName}' in phase {PhaseId} did not have a valid Repo ID (Id={RepoId}) for mapping.", categoryDto.Name, phase.Id, categoryDto.Id);
                                }
                            }
                        }

                        // STEP 4b: Add Tasks for this phase
                        if (phaseDto.Tasks?.Any() == true)
                        {
                            _logger.LogInformation("Adding {TaskCount} tasks to phase {PhaseId}", phaseDto.Tasks.Count, phase.Id);
                            foreach (var taskDto in phaseDto.Tasks)
                            {
                                _logger.LogDebug("Processing Task DTO: {TaskName} for Phase ID: {PhaseId}", taskDto.Name, phase.Id);

                                // --- Category Mapping Debug --- 
                                int repoCategoryId = taskDto.ProjectTaskCategoryId;
                                _logger.LogDebug("Attempting to map Repo Category ID: {RepoCategoryId} for Task: {TaskName}", repoCategoryId, taskDto.Name);

                                if (!categoryRepoIdToNewIdMap.TryGetValue(repoCategoryId, out int newCategoryId))
                                {
                                    _logger.LogWarning("--> MAPPING FAILED for Repo Category ID {RepoCategoryId}. Task '{TaskName}' will be SKIPPED. Map contents: {MapContents}", 
                                        repoCategoryId, 
                                        taskDto.Name,
                                        string.Join(", ", categoryRepoIdToNewIdMap.Select(kv => $"[{kv.Key}:{kv.Value}]")));
                                    continue; // Skip task if category mapping failed
                                }
                                _logger.LogDebug("--> MAPPING SUCCEEDED for Repo Category ID {RepoCategoryId}. Found New DB Category ID: {NewDbCategoryId}", repoCategoryId, newCategoryId);
                                // --- End Category Mapping Debug ---

                                // Create the task
                                var task = new ProjectTask
                                {
                                    Name = taskDto.Name,
                                    Description = taskDto.Description,
                                    StartDate = taskDto.StartDate,
                                    EndDate = taskDto.EndDate,
                                    ProjectTaskCategoryId = newCategoryId, // Use the NEW mapped ID
                                    HasSubTasks = taskDto.HasSubTasks,
                                    Status = taskDto.Status,
                                    ProjectPhaseId = phase.Id // Link to the phase
                                };

                                _logger.LogDebug("Adding Task '{TaskName}' to Phase ID {PhaseId}'s collection.", task.Name, phase.Id);
                                phase.ProjectTasks.Add(task);
                                
                                try 
                                {
                                    _logger.LogDebug("Attempting SaveChangesAsync after adding task '{TaskName}' (before subtasks/resources).", task.Name);
                                    await _context.SaveChangesAsync(); // Task gets its ID
                                    _logger.LogInformation("Successfully saved task '{TaskName}' (New Task ID: {TaskId}) with New DB Category ID {NewDbCategoryId} in phase {PhaseId}", 
                                        task.Name, task.Id, newCategoryId, phase.Id);
                                }
                                catch (Exception ex) 
                                {
                                    _logger.LogError(ex, "EXCEPTION during SaveChangesAsync immediately after adding task '{TaskName}' (ID attempt was {TaskId}). Task might not be saved.", task.Name, task.Id);
                                    // Decide whether to continue processing other tasks or rethrow
                                    // For now, we log and continue to the next task in the DTO
                                    continue; 
                                }

                                // STEP 4c: Add Subtasks for this task
                                if (taskDto.SubTasks?.Any() == true)
                                {
                                    _logger.LogInformation("Adding {SubTaskCount} subtasks to task {TaskId}", taskDto.SubTasks.Count, task.Id);
                                    foreach (var subtaskDto in taskDto.SubTasks)
                                    {
                                        var subtask = new ProjectSubTask
                                        {
                                            Name = subtaskDto.Name,
                                            Description = subtaskDto.Description,
                                            ProjectTaskId = task.Id // Link to the parent task
                                        };
                                        await _context.ProjectSubTasks.AddAsync(subtask);
                                    }
                                    await _context.SaveChangesAsync(); // Subtasks get saved
                                }

                                // STEP 4d: Link Task Resources
                                if (taskDto.ResourceIds?.Any() == true)
                                {
                                     _logger.LogInformation("Linking {ResourceCount} resources to task {TaskId}", taskDto.ResourceIds.Count, task.Id);
                                    foreach (var resourceId in taskDto.ResourceIds)
                                    {
                                        // Find the ProjectResource CREATED EARLIER for THIS project
                                        var projectResource = createdProjectResources.FirstOrDefault(pr => pr.Id == resourceId);

                                        if (projectResource != null)
                                        {
                                            var taskResource = new ProjectTask_Resource
                                            {
                                                ProjectTaskId = task.Id, // Link to the task
                                                ProjectResourceId = projectResource.Id // Link to the project resource
                                            };
                                            await _context.ProjectTaskResources.AddAsync(taskResource);
                                            _logger.LogInformation("Linked resource ID {ResourceId} to task ID {TaskId}", projectResource.Id, task.Id);
                                        }
                                        else
                                        {
                                            _logger.LogWarning("ProjectResource with ID {ResourceId} specified in Task DTO was not found among resources created for this project (Task ID: {TaskId}). Skipping link.", resourceId, task.Id);
                                        }
                                    }
                                    await _context.SaveChangesAsync(); // Task-Resource links get saved
                                }
                            } // End foreach taskDto
                        } // End if phaseDto.Tasks
                    } // End foreach phaseDto
                } // End if completeProject.Phases

                // STEP 5: Commit the transaction
                await transaction.CommitAsync();
                _logger.LogInformation("Successfully committed transaction for project '{ProjectName}' (ID: {ProjectId})", project.Name, project.Id);

                // STEP 6: Return the created project with all relationships loaded
                // Ensure all necessary includes are present to match the expected return structure
                return await _context.Projects
                    .Include(p => p.ProjectNotebooks)
                    .Include(p => p.ProjectResources)
                    .Include(p => p.ProjectPhases)
                        .ThenInclude(ph => ph.ProjectTaskCategories)
                    .Include(p => p.ProjectPhases)
                        .ThenInclude(ph => ph.ProjectTasks)
                            .ThenInclude(t => t.ProjectSubTasks) // Include Subtasks
                    .Include(p => p.ProjectPhases)
                        .ThenInclude(ph => ph.ProjectTasks)
                            .ThenInclude(t => t.ProjectTaskResources) // Include TaskResources join table
                                .ThenInclude(tr => tr.ProjectResource) // Include the actual Resource details via join table
                    .AsNoTracking() // Use AsNoTracking if the returned entity is not meant for further updates in this context
                    .FirstOrDefaultAsync(p => p.Id == project.Id);

            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating complete project : {ErrorMessage}. Rolling back transaction.", ex.Message);
                await transaction.RollbackAsync();
                // Rethrow or handle the exception as appropriate for your application
                throw;
            }
        }
    }
}