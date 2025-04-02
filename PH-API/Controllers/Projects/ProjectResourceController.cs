using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using PH_API.Dtos.Projects.Resources;
using PH_API.IRepositories.Projects;
using PH_API.Mappers.Projects;
using PH_API.Models.Projects.Resources;

namespace PH_API.Controllers.Projects
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProjectResourceController : ControllerBase
    {
        private readonly ILogger<ProjectResourceController> _logger;
        private readonly IProjectResourceRepository _resourceRepository;

        public ProjectResourceController(ILogger<ProjectResourceController> logger, IProjectResourceRepository resourceRepository)
        {
            _logger = logger;
            _resourceRepository = resourceRepository;
        }

        // GET: api/ProjectResource
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProjectResourceDto>>> GetResources()
        {
            try
            {
                var resources = await _resourceRepository.GetProjectResourcesAsync();
                var resourceDtos = resources.Select(r => r.ToProjectResourceDto()).ToList();
                return Ok(resourceDtos);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving resources");
                return StatusCode(500, "Internal server error");
            }
        }

        // GET: api/ProjectResource/{id}
        [HttpGet("{id}")]
        public async Task<ActionResult<ProjectResourceDto>> GetResource(int id)
        {
            try
            {
                var resource = await _resourceRepository.GetProjectResourceAsync(id);
                if (resource == null)
                {
                    return NotFound();
                }
                return Ok(resource.ToProjectResourceDto());
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error retrieving resource with id {id}");
                return StatusCode(500, "Internal server error");
            }
        }

        // POST: api/ProjectResource
        [HttpPost]
        public async Task<ActionResult<ProjectResourceDto>> CreateResource(ProjectResourceCreateDto resourceCreateDto)
        {
            try
            {
                var resource = resourceCreateDto.ToProjectResourceCreateDto();
                var createdResource = await _resourceRepository.AddProjectResourceAsync(resource);
                return CreatedAtAction(nameof(GetResource), new { id = createdResource.Id }, createdResource.ToProjectResourceDto());
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating resource");
                return StatusCode(500, "Internal server error");
            }
        }

        // PUT: api/ProjectResource/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateResource(int id, ProjectResourceUpdateDto resourceUpdateDto)
        {
            try
            {
                var existingResource = await _resourceRepository.GetProjectResourceAsync(id);
                if (existingResource == null)
                {
                    return NotFound();
                }

                var resource = resourceUpdateDto.ToProjectResourceUpdateDto();
                resource.Id = id;
                resource.ProjectId = existingResource.ProjectId;

                await _resourceRepository.UpdateProjectResourceAsync(id, resource);
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error updating resource with id {id}");
                return StatusCode(500, "Internal server error");
            }
        }

        // DELETE: api/ProjectResource/{id}
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteResource(int id)
        {
            try
            {
                var resource = await _resourceRepository.GetProjectResourceAsync(id);
                if (resource == null)
                {
                    return NotFound();
                }

                await _resourceRepository.DeleteProjectResourceAsync(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error deleting resource with id {id}");
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
