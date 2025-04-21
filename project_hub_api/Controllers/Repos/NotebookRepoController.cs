using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using project_hub_api.Data;
using project_hub_api.Dtos.Repo;
using project_hub_api.IRepositories.Repos;
using project_hub_api.Mappers.Repo;
using project_hub_api.Models.Repo;

namespace project_hub_api.Controllers.Repos
{
    [ApiController]
    [Route("api/[controller]")]
    public class NotebookRepoController : ControllerBase
    {
        private readonly INotebookRepoRepository _notebookRepository;
        private readonly AppDbContext _context;
        private readonly ILogger<NotebookRepoController> _logger;

        public NotebookRepoController(INotebookRepoRepository notebookRepository, AppDbContext context, ILogger<NotebookRepoController> logger)
        {
            _notebookRepository = notebookRepository;
            _context = context;
            _logger = logger;
        }

        // API GET: api/NotebookRepo
        [HttpGet]
        public async Task<IActionResult> GetNotebooks()
        {
            try
            {
                var notebooks = await _notebookRepository.GetNotebooksAsync();
                var dto = notebooks.Select(s => s.ToNotebookRepoDto());
                return Ok(dto);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving notebooks");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet]
        [Route ("{id}")]
        public async Task<IActionResult> GetNotebook(int id)
        {
            try
            {
                var notebook = await _notebookRepository.GetNotebookByIdAsync(id);
                if (notebook == null)
                {
                    return NotFound("Notebook not found");
                }
                var dto = notebook.ToNotebookRepoDto();
                return Ok(dto);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error retrieving notebook with id {id}");
                return StatusCode(500, "Internal server error");
            }
        }

        // API POST: api/NotebookRepo
        [HttpPost]
        [Route ("")]
        public async Task<IActionResult> PostNotebookAsync(NotebookRepoCreateDto notebookRepoCreateDto)
        {
            try
            {
                var createNotebook = notebookRepoCreateDto.ToNotebookRepoCreateDto();
                await _notebookRepository.AddNotebookAsync(createNotebook);
                return CreatedAtAction(nameof(GetNotebook), new { id = createNotebook.Id }, createNotebook);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating notebook");
                return StatusCode(500, "Internal server error");
            }
        }

        // API PUT: api/NotebookRepo/{id}
        [HttpPut]
        [Route ("{id}")]
        public async Task<IActionResult> PutNotebookAsync(int id, NotebookRepoUpdateDto notebookRepoUpdateDto)
        {
            try
            {
                var updateNotebook = notebookRepoUpdateDto.ToNotebookRepoUpdateDto();
                var notebook = await _notebookRepository.GetNotebookByIdAsync(id);
                if (notebook == null)
                {
                    return NotFound("Notebook not found");
                }
                if (id != notebook.Id)
                {
                    return BadRequest("Notebook id does not match");
                }
                
                await _notebookRepository.UpdateNotebookAsync(id, updateNotebook);
                var updatedNotebook = await _notebookRepository.GetNotebookByIdAsync(id);
                return Ok(updatedNotebook);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error updating notebook with id {id}");
                return StatusCode(500, "Internal server error");
            }
        }

        // API DELETE: api/NotebookRepo/{id}
        [HttpDelete]
        [Route ("{id}")]
        public async Task<IActionResult> DeleteNotebookAsync(int id)
        {
            try
            {
                var notebook = await _notebookRepository.GetNotebookByIdAsync(id);
                if (notebook == null)
                {
                    return NotFound("Notebook not found");
                }
                await _notebookRepository.DeleteNotebookAsync(notebook);
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