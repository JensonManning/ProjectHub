using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using project_hub_api.IRepositories.Projects;
using project_hub_api.Models.Projects.Tasks;
using project_hub_api.Dtos.Projects.Tasks;
using project_hub_api.Mappers.Projects;

namespace project_hub_api.Controllers.Projects
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProjectTaskResourcesController : ControllerBase
    {
        private readonly ILogger<ProjectTaskResourcesController> _logger;
        private readonly IProjectTaskResourcesRepository _resourcesRepository;

        public ProjectTaskResourcesController(ILogger<ProjectTaskResourcesController> logger, IProjectTaskResourcesRepository resourcesRepository)
        {
            _logger = logger;
            _resourcesRepository = resourcesRepository;
        }

        // GET: api/ProjectTaskResources
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProjectTaskResourcesDto>>> GetTaskResources()
        {
            try
            {
                var resources = await _resourcesRepository.GetProjectTaskResourcesAsync();
                var resourceDtos = resources.Select(r => r.ToProjectTaskResourcesDto()).ToList();
                return Ok(resourceDtos);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving task resources");
                return StatusCode(500, "Internal server error");
            }
        }

        // GET: api/ProjectTaskResources/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProjectTaskResourcesDto>> GetTaskResource(int id)
        {
            try
            {
                var resource = await _resourcesRepository.GetProjectTaskResourceAsync(id);

                if (resource == null)
                {
                    return NotFound();
                }

                return Ok(resource.ToProjectTaskResourcesDto());
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error retrieving task resource with id {id}");
                return StatusCode(500, "Internal server error");
            }
        }

        // POST: api/ProjectTaskResources
        [HttpPost]
        public async Task<ActionResult<ProjectTaskResourcesDto>> CreateTaskResource(ProjectTaskResourcesCreateDto resourceCreateDto)
        {
            try
            {
                var resource = resourceCreateDto.ToProjectTaskResourcesCreateDto();
                var createdResource = await _resourcesRepository.AddProjectTaskResourceAsync(resource);
                return CreatedAtAction(nameof(GetTaskResource), new { id = createdResource.ProjectTaskId }, createdResource.ToProjectTaskResourcesDto());
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating task resource");
                return StatusCode(500, "Internal server error");
            }
        }

        // PUT: api/ProjectTaskResources/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTaskResource(int id, ProjectTaskResourcesUpdateDto resourceUpdateDto)
        {
            try
            {
                var resource = resourceUpdateDto.ToProjectTaskResourcesUpdateDto();
                var updatedResource = await _resourcesRepository.UpdateProjectTaskResourceAsync(id, resource);
                
                if (updatedResource == null)
                {
                    return NotFound();
                }

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error updating task resource with id {id}");
                return StatusCode(500, "Internal server error");
            }
        }

        // DELETE: api/ProjectTaskResources/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTaskResource(int id)
        {
            try
            {
                var resource = await _resourcesRepository.DeleteProjectTaskResourceAsync(id);
                
                if (resource == null)
                {
                    return NotFound();
                }

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error deleting task resource with id {id}");
                return StatusCode(500, "Internal server error");
            }
        }
    }
}