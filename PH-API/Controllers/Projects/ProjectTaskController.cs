using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using PH_API.Dtos.Projects.Tasks;
using PH_API.IRepositories.Projects;
using PH_API.Mappers.Projects;
using PH_API.Models.Projects.Tasks;

namespace PH_API.Controllers.Projects
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProjectTaskController : ControllerBase
    {
        private readonly IProjectTaskRepository _projectTaskRepository;
        private readonly ILogger<ProjectTaskController> _logger;

        public ProjectTaskController(IProjectTaskRepository projectTaskRepository, ILogger<ProjectTaskController> logger)
        {
            _projectTaskRepository = projectTaskRepository;
            _logger = logger;
        }

        [HttpGet]
        [Route("")]
        public async Task<ActionResult<IEnumerable<ProjectTask>>> GetProjectTasks()
        {
            var tasks =  await _projectTaskRepository.GetProjectTasksAsync();
            var dto = tasks.Select(t => t.ToProjectTaskDto()).ToList();
            return Ok(dto);
        }

        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult<ProjectTask>> GetProjectTask(int id)
        {
            var task = await _projectTaskRepository.GetProjectTaskAsync(id);
            if (task == null)
            {
                return NotFound();
            }
            var dto = task.ToProjectTaskDto();
            return Ok(dto);
        }

        [HttpPost]
        [Route("")]
        public async Task<ActionResult<ProjectTask>> CreateProjectTask([FromBody] ProjectTaskCreateDto taskDto)
        {

            try
            {
                var task = taskDto.ToProjectTaskCreateDto();
                var createdTask = await _projectTaskRepository.AddProjectTaskAsync(task);
                return CreatedAtAction(nameof(GetProjectTask), new { id = createdTask.Id }, createdTask.ToProjectTaskDto());
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating task");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> UpdateProjectTask(int id, ProjectTaskUpdateDto taskDto)
        {
            try
            {
                // Get the existing task
                var existingTask = await _projectTaskRepository.GetProjectTaskAsync(id);
                if (existingTask == null)
                {
                    return NotFound();
                }

                // Map DTO to new task object
                var updatedTask = taskDto.ToProjectTaskUpdateDto();
                
                // Update only the properties that should change
                existingTask.Name = updatedTask.Name;
                existingTask.Description = updatedTask.Description;
                existingTask.StartDate = updatedTask.StartDate;
                existingTask.EndDate = updatedTask.EndDate;
                existingTask.ProjectTaskTypeId = updatedTask.ProjectTaskTypeId;
                existingTask.ProjectTaskCategoryId = updatedTask.ProjectTaskCategoryId;

                // Save changes
                var result = await _projectTaskRepository.UpdateProjectTaskAsync(id, existingTask);
                
                if (result == null)
                {
                    return NotFound();
                }

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error updating task with id {id}");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> DeleteProjectTask(int id)
        {
            try
            {
                var task = await _projectTaskRepository.GetProjectTaskAsync(id);
                if (task == null)
                {
                    return NotFound();
                }
                
                await _projectTaskRepository.DeleteProjectTaskAsync(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error deleting task with id {id}");
                return StatusCode(500, "Internal server error");
            }
        }
    }
}