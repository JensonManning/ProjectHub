using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using PH_API.IRepositories.Projects;
using PH_API.Models.Projects;
using PH_API.Dtos.Projects;
using PH_API.Mappers.Projects;

namespace PH_API.Controllers.Projects
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProjectController : ControllerBase
    {
        private readonly ILogger<ProjectController> _logger;
        private readonly IProjectRepository _projectRepository;

        public ProjectController(ILogger<ProjectController> logger, IProjectRepository projectRepository)
        {
            _logger = logger;
            _projectRepository = projectRepository;
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
    }
}