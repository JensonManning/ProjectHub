using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using project_hub_api.IRepositories.Projects;
using project_hub_api.Models.Projects.Notebooks;
using project_hub_api.Dtos.Projects.Notebooks;
using project_hub_api.Mappers.Projects;

namespace project_hub_api.Controllers.Projects
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProjectNotebookController : ControllerBase
    {
        private readonly ILogger<ProjectNotebookController> _logger;
        private readonly IProjectNotebookRepository _notebookRepository;

        public ProjectNotebookController(ILogger<ProjectNotebookController> logger, IProjectNotebookRepository notebookRepository)
        {
            _logger = logger;
            _notebookRepository = notebookRepository;
        }

        // GET: api/ProjectNotebook
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProjectNotebookDto>>> GetNotebooks()
        {
            try
            {
                var notebooks = await _notebookRepository.GetProjectNotebooksAsync();
                var notebookDtos = notebooks.Select(n => n.ToProjectNotebookDto()).ToList();
                return Ok(notebookDtos);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving notebooks");
                return StatusCode(500, "Internal server error");
            }
        }

        // GET: api/ProjectNotebook/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProjectNotebookDto>> GetNotebook(int id)
        {
            try
            {
                var notebook = await _notebookRepository.GetProjectNotebookAsync(id);

                if (notebook == null)
                {
                    return NotFound();
                }

                return Ok(notebook.ToProjectNotebookDto());
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error retrieving notebook with id {id}");
                return StatusCode(500, "Internal server error");
            }
        }

        // POST: api/ProjectNotebook
        [HttpPost]
        public async Task<ActionResult<ProjectNotebookDto>> CreateNotebook(ProjectNotebookCreateDto notebookCreateDto)
        {
            try
            {
                var notebook = notebookCreateDto.ToProjectNotebookCreateDto();
                var createdNotebook = await _notebookRepository.AddProjectNotebookAsync(notebook);
                return CreatedAtAction(nameof(GetNotebook), new { id = createdNotebook.Id }, createdNotebook.ToProjectNotebookDto());
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating notebook");
                return StatusCode(500, "Internal server error");
            }
        }

        // PUT: api/ProjectNotebook/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateNotebook(int id, ProjectNotebookUpdateDto notebookUpdateDto)
        {
            try
            {
                // First get the existing notebook to preserve the ProjectId
                var existingNotebook = await _notebookRepository.GetProjectNotebookAsync(id);
                if (existingNotebook == null)
                {
                    return NotFound();
                }

                var notebook = notebookUpdateDto.ToProjectNotebookUpdateDto();
                notebook.ProjectId = existingNotebook.ProjectId; // Preserve the ProjectId
                
                var updatedNotebook = await _notebookRepository.UpdateProjectNotebookAsync(id, notebook);
                
                if (updatedNotebook == null)
                {
                    return NotFound();
                }

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error updating notebook with id {id}");
                return StatusCode(500, "Internal server error");
            }
        }

        // DELETE: api/ProjectNotebook/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteNotebook(int id)
        {
            try
            {
                var notebook = await _notebookRepository.DeleteProjectNotebookAsync(id);
                
                if (notebook == null)
                {
                    return NotFound();
                }

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error deleting notebook with id {id}");
                return StatusCode(500, "Internal server error");
            }
        }
    }
}