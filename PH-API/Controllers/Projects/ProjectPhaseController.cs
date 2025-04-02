using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using PH_API.IRepositories.Projects;
using PH_API.Models.Projects.Phases;
using PH_API.Dtos.Projects.Phases;
using PH_API.Mappers.Projects;

namespace PH_API.Controllers.Projects
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProjectPhaseController : ControllerBase
    {
        private readonly ILogger<ProjectPhaseController> _logger;
        private readonly IProjectPhaseRepository _phaseRepository;

        public ProjectPhaseController(ILogger<ProjectPhaseController> logger, IProjectPhaseRepository phaseRepository)
        {
            _logger = logger;
            _phaseRepository = phaseRepository;
        }

        // GET: api/ProjectPhase
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProjectPhaseDto>>> GetPhases()
        {
            try
            {
                var phases = await _phaseRepository.GetProjectPhasesAsync();
                var phaseDtos = phases.Select(p => p.ToProjectPhaseDto()).ToList();
                return Ok(phaseDtos);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving phases");
                return StatusCode(500, "Internal server error");
            }
        }

        // GET: api/ProjectPhase/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProjectPhaseDto>> GetPhase(int id)
        {
            try
            {
                var phase = await _phaseRepository.GetProjectPhaseAsync(id);

                if (phase == null)
                {
                    return NotFound();
                }

                return Ok(phase.ToProjectPhaseDto());
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error retrieving phase with id {id}");
                return StatusCode(500, "Internal server error");
            }
        }

        // POST: api/ProjectPhase
        [HttpPost]
        public async Task<ActionResult<ProjectPhaseDto>> CreatePhase(ProjectPhaseCreateDto phaseCreateDto)
        {
            try
            {
                var phase = phaseCreateDto.ToProjectPhaseCreateDto();
                var createdPhase = await _phaseRepository.AddProjectPhaseAsync(phase);
                return CreatedAtAction(nameof(GetPhase), new { id = createdPhase.Id }, createdPhase.ToProjectPhaseDto());
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating phase");
                return StatusCode(500, "Internal server error");
            }
        }

        // PUT: api/ProjectPhase/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdatePhase(int id, ProjectPhaseUpdateDto phaseUpdateDto)
        {
            try
            {
                // First get the existing phase to preserve the ProjectId
                var existingPhase = await _phaseRepository.GetProjectPhaseAsync(id);
                if (existingPhase == null)
                {
                    return NotFound();
                }

                var phase = phaseUpdateDto.ToProjectPhaseUpdateDto();
                phase.ProjectId = existingPhase.ProjectId; // Preserve the ProjectId
                
                var updatedPhase = await _phaseRepository.UpdateProjectPhaseAsync(id, phase);
                
                if (updatedPhase == null)
                {
                    return NotFound();
                }

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error updating phase with id {id}");
                return StatusCode(500, "Internal server error");
            }
        }

        // DELETE: api/ProjectPhase/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePhase(int id)
        {
            try
            {
                var phase = await _phaseRepository.DeleteProjectPhaseAsync(id);
                
                if (phase == null)
                {
                    return NotFound();
                }

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error deleting phase with id {id}");
                return StatusCode(500, "Internal server error");
            }
        }
    }
}