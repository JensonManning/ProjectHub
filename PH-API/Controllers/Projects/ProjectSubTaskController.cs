using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using PH_API.IRepositories.Projects;
using PH_API.Models.Projects.Tasks;
using PH_API.Dtos.Projects.Tasks;
using PH_API.Mappers.Projects;

namespace PH_API.Controllers.Projects
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProjectSubTaskController : ControllerBase
    {
        private readonly ILogger<ProjectSubTaskController> _logger;
        private readonly IProjectSubTaskRepository _subTaskRepository;

        public ProjectSubTaskController(ILogger<ProjectSubTaskController> logger, IProjectSubTaskRepository subTaskRepository)
        {
            _logger = logger;
            _subTaskRepository = subTaskRepository;
        }

        // GET: api/ProjectSubTask
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProjectSubTaskDto>>> GetSubTasks()
        {
            try
            {
                var subTasks = await _subTaskRepository.GetProjectSubTasksAsync();
                var subTaskDtos = subTasks.Select(s => s.ToProjectSubTaskDto()).ToList();
                return Ok(subTaskDtos);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving subtasks");
                return StatusCode(500, "Internal server error");
            }
        }

        // GET: api/ProjectSubTask/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProjectSubTaskDto>> GetSubTask(int id)
        {
            try
            {
                var subTask = await _subTaskRepository.GetProjectSubTaskAsync(id);

                if (subTask == null)
                {
                    return NotFound();
                }

                return Ok(subTask.ToProjectSubTaskDto());
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error retrieving subtask with id {id}");
                return StatusCode(500, "Internal server error");
            }
        }

        // POST: api/ProjectSubTask
        [HttpPost]
        public async Task<ActionResult<ProjectSubTaskDto>> CreateSubTask(ProjectSubTaskCreateDto subTaskCreateDto)
        {
            try
            {
                var subTask = subTaskCreateDto.ToProjectSubTaskCreateDto();
                var createdSubTask = await _subTaskRepository.AddProjectSubTaskAsync(subTask);
                return CreatedAtAction(nameof(GetSubTask), new { id = createdSubTask.Id }, createdSubTask.ToProjectSubTaskDto());
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating subtask");
                return StatusCode(500, "Internal server error");
            }
        }

        // PUT: api/ProjectSubTask/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSubTask(int id, ProjectSubTaskUpdateDto subTaskUpdateDto)
        {
            try
            {
                // First get the existing subtask to preserve the ProjectTaskId
                var existingSubTask = await _subTaskRepository.GetProjectSubTaskAsync(id);
                if (existingSubTask == null)
                {
                    return NotFound();
                }

                var subTask = subTaskUpdateDto.ToProjectSubTaskUpdateDto();
                subTask.ProjectTaskId = existingSubTask.ProjectTaskId; // Preserve the ProjectTaskId
                
                var updatedSubTask = await _subTaskRepository.UpdateProjectSubTaskAsync(id, subTask);
                
                if (updatedSubTask == null)
                {
                    return NotFound();
                }

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error updating subtask with id {id}");
                return StatusCode(500, "Internal server error");
            }
        }

        // DELETE: api/ProjectSubTask/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSubTask(int id)
        {
            try
            {
                var subTask = await _subTaskRepository.DeleteProjectSubTaskAsync(id);
                
                if (subTask == null)
                {
                    return NotFound();
                }

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error deleting subtask with id {id}");
                return StatusCode(500, "Internal server error");
            }
        }
    }
}