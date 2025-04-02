using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using PH_API.Data;
using PH_API.Dtos.Repo;
using PH_API.IRepositories.Repos;
using PH_API.Mappers.Repo;
using PH_API.Models.Repo;

namespace PH_API.Controllers.Repos
{
    [ApiController]
    [Route("api/[controller]")]
    public class TaskRepoController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly ITaskRepoRepository _taskRepoRepository;
        private readonly ILogger<TaskRepoController> _logger;

        public TaskRepoController(AppDbContext context, ITaskRepoRepository taskRepoRepository, ILogger<TaskRepoController> logger)
        {
            _context = context;
            _taskRepoRepository = taskRepoRepository;
            _logger = logger;
        }

        [HttpGet]
        [Route ("")]
        public async Task<IActionResult> GetTaskRepos()
        {
            try
            {
                var task = await _taskRepoRepository.GetTaskReposAsync();
                var taskDto = task.Select(s => s.ToTaskRepoDto()).ToList();
                return Ok(taskDto);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving task repos");
                return StatusCode(500, new { message = "Internal server error" });
            }
        }

        [HttpGet]
        [Route ("{id}")]
        public async Task<IActionResult> GetTaskRepo([FromRoute] int id)
        {
            try
            {
                var taskRepo = await _taskRepoRepository.GetTaskRepoAsync(id);
                if (taskRepo == null)
                {
                    return NotFound();
                }
                var dto = taskRepo.ToTaskRepoDto();
                return Ok(dto);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error retrieving task repo with id {id}");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPost]
        [Route ("")]
        public async Task<IActionResult> PostTaskRepo([FromBody] TaskRepoCreateDto taskRepoDto)
        {
            try
            {
                var taskRepo = TaskRepoMapper.ToTaskRepoCreateDto(taskRepoDto);
                var createdTask = await _taskRepoRepository.AddTaskRepoAsync(
                    taskRepo, 
                    taskRepoDto.ResourceIds
                );
                return CreatedAtAction(nameof(GetTaskRepo), new { id = createdTask.Id }, createdTask);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating task repo");
                return StatusCode(500, "Internal server error");
            }
        }

        [HttpPut]
        [Route ("{id}")]
        public async Task<IActionResult> PutTaskRepo([FromRoute] int id, [FromBody] TaskRepoUpdateDto taskRepoDto)
        {
            try
            {
                var taskRepo = await _taskRepoRepository.GetTaskRepoAsync(id);
                if (taskRepo == null)
                {
                    return NotFound();
                }
                if (id != taskRepo.Id)
                {
                    return BadRequest();
                }

                var taskRepoUpdate = TaskRepoMapper.ToTaskRepoUpdateDto(taskRepoDto);

                await _taskRepoRepository.UpdateTaskRepoAsync(id, taskRepoUpdate);
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error updating task repo with id {id}");
                return StatusCode(500, new { message = "Internal server error" });
            }
        }

        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> DeleteTaskRepo([FromRoute] int id)
        {
            try
            {
                var taskRepo = await _taskRepoRepository.GetTaskRepoAsync(id);
                if (taskRepo == null)
                {
                    return NotFound();
                }
                await _taskRepoRepository.DeleteTaskRepoAsync(id);
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error deleting task repo with id {id}");
                return StatusCode(500, "Internal server error");
            }
        }
    }
}