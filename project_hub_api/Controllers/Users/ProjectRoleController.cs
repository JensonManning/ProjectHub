using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using project_hub_api.IRepositories.Users;
using project_hub_api.Models.Users;
using project_hub_api.Dtos.Users;
using project_hub_api.Mappers.Users;

namespace project_hub_api.Controllers.Users
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProjectRoleController : ControllerBase
    {
        private readonly ILogger<ProjectRoleController> _logger;
        private readonly IProjectRoleRepository _projectRoleRepository;

        public ProjectRoleController(ILogger<ProjectRoleController> logger, IProjectRoleRepository projectRoleRepository)
        {
            _logger = logger;
            _projectRoleRepository = projectRoleRepository;
        }

        // GET: api/ProjectRole
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProjectRoleDto>>> GetProjectRoles()
        {
            try
            {
                var projectRoles = await _projectRoleRepository.GetProjectRolesAsync();
                var projectRoleDtos = projectRoles.Select(p => p.ToProjectRoleDto()).ToList();
                return Ok(projectRoleDtos);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving project roles");
                return StatusCode(500, "Internal server error");
            }
        }

        // GET: api/ProjectRole/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProjectRoleDto>> GetProjectRole(int id)
        {
            try
            {
                var projectRole = await _projectRoleRepository.GetProjectRoleAsync(id);

                if (projectRole == null)
                {
                    return NotFound();
                }

                return Ok(projectRole.ToProjectRoleDto());
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error retrieving project role with id {id}");
                return StatusCode(500, "Internal server error");
            }
        }

        // POST: api/ProjectRole
        [HttpPost]
        public async Task<ActionResult<ProjectRoleDto>> CreateProjectRole(ProjectRoleCreateDto projectRoleCreateDto)
        {
            try
            {
                var projectRole = projectRoleCreateDto.ToProjectRoleCreateDto();
                var createdProjectRole = await _projectRoleRepository.AddProjectRoleAsync(projectRole);
                return CreatedAtAction(nameof(GetProjectRole), new { id = createdProjectRole.Id }, createdProjectRole.ToProjectRoleDto());
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating project role");
                return StatusCode(500, "Internal server error");
            }
        }

        // PUT: api/ProjectRole/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateProjectRole(int id, ProjectRoleUpdateDto projectRoleUpdateDto)
        {
            try
            {
                var projectRole = projectRoleUpdateDto.ToProjectRoleUpdateDto();
                var updatedProjectRole = await _projectRoleRepository.UpdateProjectRoleAsync(id, projectRole);
                
                if (updatedProjectRole == null)
                {
                    return NotFound();
                }

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error updating project role with id {id}");
                return StatusCode(500, "Internal server error");
            }
        }

        // DELETE: api/ProjectRole/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProjectRole(int id)
        {
            try
            {
                var projectRole = await _projectRoleRepository.DeleteProjectRoleAsync(id);
                
                if (projectRole == null)
                {
                    return NotFound();
                }

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error deleting project role with id {id}");
                return StatusCode(500, "Internal server error");
            }
        }
    }
} 