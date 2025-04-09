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
    public class ProjectTaskCategoryController : ControllerBase
    {
        private readonly ILogger<ProjectTaskCategoryController> _logger;
        private readonly IProjectTaskCategoryRepository _categoryRepository;

        public ProjectTaskCategoryController(ILogger<ProjectTaskCategoryController> logger, IProjectTaskCategoryRepository categoryRepository)
        {
            _logger = logger;
            _categoryRepository = categoryRepository;
        }

        // GET: api/ProjectTaskCategory
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProjectTaskCategoryDto>>> GetCategories()
        {
            try
            {
                var categories = await _categoryRepository.GetProjectTaskCategoriesAsync();
                var categoryDtos = categories.Select(c => c.ToProjectTaskCategoryDto()).ToList();
                return Ok(categoryDtos);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving task categories");
                return StatusCode(500, "Internal server error");
            }
        }

        // GET: api/ProjectTaskCategory/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProjectTaskCategoryDto>> GetCategory(int id)
        {
            try
            {
                var category = await _categoryRepository.GetProjectTaskCategoryAsync(id);

                if (category == null)
                {
                    return NotFound();
                }

                return Ok(category.ToProjectTaskCategoryDto());
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error retrieving task category with id {id}");
                return StatusCode(500, "Internal server error");
            }
        }

        // POST: api/ProjectTaskCategory
        [HttpPost]
        public async Task<ActionResult<ProjectTaskCategoryDto>> CreateCategory(ProjectTaskCategoryCreateDto categoryCreateDto)
        {
            try
            {
                var category = categoryCreateDto.ToProjectTaskCategoryCreateDto();
                var createdCategory = await _categoryRepository.AddProjectTaskCategoryAsync(category);
                return CreatedAtAction(nameof(GetCategory), new { id = createdCategory.Id }, createdCategory.ToProjectTaskCategoryDto());
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating task category");
                return StatusCode(500, "Internal server error");
            }
        }

        // PUT: api/ProjectTaskCategory/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCategory(int id, ProjectTaskCategoryUpdateDto categoryUpdateDto)
        {
            try
            {
                var category = categoryUpdateDto.ToProjectTaskCategoryUpdateDto();
                var updatedCategory = await _categoryRepository.UpdateProjectTaskCategoryAsync(id, category);
                
                if (updatedCategory == null)
                {
                    return NotFound();
                }

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error updating task category with id {id}");
                return StatusCode(500, "Internal server error");
            }
        }

        // DELETE: api/ProjectTaskCategory/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            try
            {
                var category = await _categoryRepository.DeleteProjectTaskCategoryAsync(id);
                
                if (category == null)
                {
                    return NotFound();
                }

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error deleting task category with id {id}");
                return StatusCode(500, "Internal server error");
            }
        }
    }
}