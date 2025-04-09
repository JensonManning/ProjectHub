using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using project_hub_api.IRepositories.Projects;
using project_hub_api.Models.Projects;
using project_hub_api.Dtos.Projects;
using project_hub_api.Mappers.Projects;
using project_hub_api.Services;
    
namespace project_hub_api.Controllers.Projects
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProjectController : ControllerBase
    {
        private readonly ILogger<ProjectController> _logger;
        private readonly IProjectRepository _projectRepository;
        private readonly ProjectCreationService _projectCreationService;

        public ProjectController(ILogger<ProjectController> logger, IProjectRepository projectRepository, ProjectCreationService projectCreationService)
        {
            _logger = logger;
            _projectRepository = projectRepository;
            _projectCreationService = projectCreationService;
        }

        // GET: api/Project
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProjectDto>>> GetProjects()
        {
            try
            {
                var projects = await _projectRepository.GetProjectsAsync();
                var projectDtos = projects.Select(p => p.ToProjectDto()).ToList();
                return Ok(projectDtos);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving projects");
                return StatusCode(500, "Internal server error");
            }
        }

        // GET: api/Project/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProjectDto>> GetProject(int id)
        {
            try
            {
                var project = await _projectRepository.GetProjectAsync(id);

                if (project == null)
                {
                    return NotFound();
                }

                return Ok(project.ToProjectDto());
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error retrieving project with id {id}");
                return StatusCode(500, "Internal server error");
            }
        }

        // POST: api/Project
        [HttpPost]
        public async Task<ActionResult<ProjectDto>> CreateProject(ProjectCreateDto projectCreateDto)
        {
            try
            {
                var project = projectCreateDto.ToProjectCreateDto();
                var createdProject = await _projectRepository.AddProjectAsync(project);
                return CreatedAtAction(nameof(GetProject), new { id = createdProject.Id }, createdProject.ToProjectDto());
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating project");
                return StatusCode(500, "Internal server error");
            }
        }

        // PUT: api/Project/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProject(int id, ProjectUpdateDto projectUpdateDto)
        {
            try
            {
                var project = projectUpdateDto.ToProjectUpdateDto();
                var updatedProject = await _projectRepository.UpdateProjectAsync(id, project);
                
                if (updatedProject == null)
                {
                    return NotFound();
                }

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error updating project with id {id}");
                return StatusCode(500, "Internal server error");
            }
        }

        // DELETE: api/Project/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProject(int id)
        {
            try
            {
                var project = await _projectRepository.DeleteProjectAsync(id);
                
                if (project == null)
                {
                    return NotFound();
                }

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error deleting project with id {id}");
                return StatusCode(500, "Internal server error");
            }
        }

        // POST: api/Project/complete
        [HttpPost("complete")]
        public async Task<ActionResult<ProjectDto>> CreateCompleteProject(CompleteProjectDto completeProjectDto)
        {
            try
            {
                _logger.LogInformation("Received request to create complete project: {ProjectName}", completeProjectDto.Name);
                
                // Create the complete project
                var createdProject = await _projectCreationService.CreateCompleteProjectAsync(completeProjectDto);
                
                // Return the created project
                return CreatedAtAction(nameof(GetProject), new { id = createdProject.Id }, createdProject.ToProjectDto());
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating complete project");
                return StatusCode(500, new { error = ex.Message, detail = ex.InnerException?.Message });
            }
        }
    }
}