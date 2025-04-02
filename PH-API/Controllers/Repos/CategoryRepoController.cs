using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using PH_API.Data;
using PH_API.IRepositories.Repos;
using PH_API.Models.Repo;
using PH_API.Mappers.Repo;
using PH_API.Dtos.Repo;

namespace PH_API.Controllers.Repos
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoryRepoController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly ICategoryRepoRepository _categoryRepoRepository;
        private readonly ILogger<CategoryRepoController> _logger;

        public CategoryRepoController(AppDbContext context, ICategoryRepoRepository categoryRepoRepository, ILogger<CategoryRepoController> logger)
        {
            _context = context;
            _categoryRepoRepository = categoryRepoRepository;
            _logger = logger;
        }

        [HttpGet]
        [Route ("")]
        public async Task<IActionResult> GetCategoryRepos()
        {
            try
            {
                var categoryRepo = await _categoryRepoRepository.GetCategoryReposAsync();
                var model = categoryRepo.Select(s => s.ToCategoryRepoDto());
                return Ok(model);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving category repos");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpGet]
        [Route ("{id}")]
        public async Task<IActionResult> GetCategoryRepo(int id)
        {
            try
            {
                var categoryRepo = await _categoryRepoRepository.GetCategoryRepoAsync(id);
                if (categoryRepo == null)
                {
                    return NotFound();
                }
                var model = categoryRepo.ToCategoryRepoDto();
                return Ok(model);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error retrieving category repo with id {id}");
                return StatusCode(500, "Internal server error");
            }
        }
        
        [HttpPost]
        [Route ("")]
        public async Task<IActionResult> PostCategoryRepo(CategoryRepoCreateDto categoryRepoCreateDto)
        {
            try
            {
                var createCategoryRepo = categoryRepoCreateDto.ToCategoryRepoCreateDto();
                await _categoryRepoRepository.AddCategoryRepoAsync(createCategoryRepo);
                return CreatedAtAction(nameof(GetCategoryRepo), new { id = createCategoryRepo.Id }, createCategoryRepo);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating category repo");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPut]
        [Route ("{id}")]
        public async Task<IActionResult> PutCategoryRepo(int id, CategoryRepoUpdateDto categoryRepoUpdateDto)
        {
            try
            {
                var catUpdate = categoryRepoUpdateDto.ToCategoryRepoUpdateDto();
                var cat = await _categoryRepoRepository.GetCategoryRepoAsync(id);
                if (cat == null)
                {
                    return NotFound();
                }
                if (id != cat.Id)
                {
                    return BadRequest();
                }

                await _categoryRepoRepository.UpdateCategoryRepoAsync(id, catUpdate);
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error updating category repo with id {id}");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpDelete]
        [Route ("{id}")]
        public async Task<IActionResult> DeleteCategoryRepo(int id)
        {
            try
            {
                var categoryRepo = await _categoryRepoRepository.GetCategoryRepoAsync(id);
                if (categoryRepo == null)
                {
                    return NotFound();
                }
                await _categoryRepoRepository.DeleteCategoryRepoAsync(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error deleting category repo with id {id}");
                return StatusCode(500, "Internal server error");
            }
        }
    }
}