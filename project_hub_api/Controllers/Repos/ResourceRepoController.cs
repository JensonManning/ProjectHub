using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using project_hub_api.Data;
using project_hub_api.Dtos.Repo;
using project_hub_api.Mappers.Repo;
using project_hub_api.Models.Repo;

namespace project_hub_api.Controllers.Repos
{
    [ApiController]
    [Route("api/[controller]")]
    public class ResourceRepoController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly ILogger<ResourceRepoController> _logger;

        public ResourceRepoController(AppDbContext context, ILogger<ResourceRepoController> logger)
        {
            _context = context;
            _logger = logger;
        }

        // API GET: api/ResourceRepo
        [HttpGet]
        [Route ("")]
        public async Task<ActionResult<IEnumerable<ResourceRepo>>> GetResourceRepos()
        {
            try
            {
                return await _context.ResourceRepo.ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving resource repos");
                return StatusCode(500, "Internal server error");
            }
        }

        // API GET: api/ResourceRepo/{id}
        [HttpGet]
        [Route ("{id}")]
        public async Task<ActionResult<ResourceRepo>> GetResourceRepo([FromRoute] int id)
        {
            try
            {
                var resourceRepo = await _context.ResourceRepo.FirstOrDefaultAsync(r => r.Id == id);
                if (resourceRepo == null)
                {
                    return NotFound();
                }
                return resourceRepo;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error retrieving resource repo with id {id}");
                return StatusCode(500, "Internal server error");
            }
        }

        // API POST: api/ResourceRepo
        [HttpPost]
        [Route ("")]
        public async Task<ActionResult<ResourceRepo>> PostResourceRepo([FromBody] ResourceRepoUpdateCreateDto resourceRepo)
        {
            try
            {
                var resourceRepoDto = resourceRepo.ToResourceRepoUpdateCreateDto();
                _context.ResourceRepo.Add(resourceRepoDto);
                await _context.SaveChangesAsync();
                return CreatedAtAction(nameof(GetResourceRepo), new { id = resourceRepoDto.Id }, resourceRepoDto);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating resource repo");
                return StatusCode(500, "Internal server error");
            }
        }

        // API PUT: api/ResourceRepo/{id}
        [HttpPut]
        [Route ("{id}")]
        public async Task<ActionResult<ResourceRepo>> PutResourceRepo([FromRoute] int id, [FromBody] ResourceRepo resourceRepo)
        {
            try
            {
                if (id != resourceRepo.Id)
                {
                    return BadRequest();
                }
                _context.ResourceRepo.Update(resourceRepo);
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error updating resource repo with id {id}");
                return StatusCode(500, "Internal server error");
            }
        }

        // API DELETE: api/ResourceRepo/{id}
        [HttpDelete]
        [Route ("{id}")]
        public async Task<ActionResult> DeleteResourceRepo([FromRoute] int id)
        {
            try
            {
                var resourceRepo = await _context.ResourceRepo.FirstOrDefaultAsync(r => r.Id == id);
                if (resourceRepo == null)
                {
                    return NotFound();
                }
                _context.ResourceRepo.Remove(resourceRepo);
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error deleting resource repo with id {id}");
                return StatusCode(500, "Internal server error");
            }
        }
    }
}