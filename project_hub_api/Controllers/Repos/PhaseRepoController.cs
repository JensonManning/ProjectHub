using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using project_hub_api.Data;
using project_hub_api.Models.Repo;
using project_hub_api.IRepositories.Repos;
using project_hub_api.Dtos.Repo;
using project_hub_api.Mappers.Repo;
namespace project_hub_api.Controllers.Repos
{
    [ApiController]
    [Route("api/[controller]")]
    public class PhaseRepoController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly IPhaseRepoRepository _phaseRepoRepository;
        private readonly ILogger<PhaseRepoController> _logger;

        public PhaseRepoController(AppDbContext context, IPhaseRepoRepository phaseRepoRepository, ILogger<PhaseRepoController> logger)
        {
            _context = context;
            _phaseRepoRepository = phaseRepoRepository;
            _logger = logger;
        }

        // API GET: api/PhaseRepo
        [HttpGet]
        [Route ("")]
        public async Task<ActionResult<IEnumerable<PhaseRepo>>> GetPhaseRepos()
        {
            try
            {
                return await _context.PhaseRepo.ToListAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving phase repos");
                return StatusCode(500, "Internal server error");
            }
        }

        // API GET: api/PhaseRepo/{id}
        [HttpGet]
        [Route ("{id}")]
        public async Task<ActionResult<PhaseRepo>> GetPhaseRepo(int id)
        {
            try
            {
                var phaseRepo = await _context.PhaseRepo.FirstOrDefaultAsync(p => p.Id == id);
                if (phaseRepo == null)
                {
                    return NotFound();
                }
                return phaseRepo;
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error retrieving phase repo with id {id}");
                return StatusCode(500, "Internal server error");
            }
        }

        // API POST: api/PhaseRepo
        [HttpPost]
        [Route ("")]
        public async Task<ActionResult<PhaseRepo>> PostPhaseRepo(PhaseRepo phaseRepo)
        {
            try
            {
                _context.PhaseRepo.Add(phaseRepo);
                await _context.SaveChangesAsync();
                return CreatedAtAction(nameof(GetPhaseRepo), new { id = phaseRepo.Id }, phaseRepo);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating phase repo");
                return StatusCode(500, "Internal server error");
            }
        }

        // API PUT: api/PhaseRepo/{id}
        [HttpPut]
        [Route ("{id}")]
        public async Task<ActionResult<PhaseRepo>> PutPhaseRepo(int id, PhaseRepoUpdateDto phaseRepoUpdateDto)
        {
            try
            {
                var updatePhase = phaseRepoUpdateDto.ToPhaseRepoUpdateDto();
                var phase = await _phaseRepoRepository.GetPhaseRepoAsync(id);
                if (phase == null)
                {
                    return NotFound("PhaseRepo not found");
                }
                if (id != phase.Id)
                {
                    return BadRequest("PhaseRepo id does not match");
                }

                await _phaseRepoRepository.UpdatePhaseRepoAsync(id, updatePhase);
                var updatedPhase = await _phaseRepoRepository.GetPhaseRepoAsync(id);
                return Ok(updatedPhase);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error updating phase repo with id {id}");
                return StatusCode(500, "Internal server error");
            }
        }

        // API DELETE: api/PhaseRepo/{id}
        [HttpDelete]
        [Route ("{id}")]
        public async Task<ActionResult> DeletePhaseRepo(int id)
        {
            try
            {
                var phaseRepo = await _context.PhaseRepo.FirstOrDefaultAsync(p => p.Id == id);
                if (phaseRepo == null)
                {
                    return NotFound();
                }
                _context.PhaseRepo.Remove(phaseRepo);
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error deleting phase repo with id {id}");
                return StatusCode(500, "Internal server error");
            }
        }
    }
}