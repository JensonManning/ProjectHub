using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using project_hub_api.Dtos.Repo;
using project_hub_api.IRepositories.Repos;
using project_hub_api.Mappers.Repo;
using project_hub_api.Models.Repo;

namespace project_hub_api.Controllers.Repos
{
    [ApiController]
    [Route("api/[controller]")]
    public class TaskTypeRepoController : ControllerBase
    {
        private readonly ITaskTypeRepoRepository _taskTypeRepo;
        private readonly ILogger<TaskTypeRepoController> _logger;

        public TaskTypeRepoController(ITaskTypeRepoRepository taskTypeRepoRepository, ILogger<TaskTypeRepoController> logger)
        {
            _taskTypeRepo = taskTypeRepoRepository;
            _logger = logger;
        }

        // API GET: api/TaskTypeRepo
        [HttpGet]
        [Route("")]
        public async Task<IActionResult> GetTaskTypeRepos()
        {
            try
            {
                var taskTypeRepos = await _taskTypeRepo.GetTaskTypeReposAsync();
                var dto = taskTypeRepos.Select(s => s.ToTaskTypeRepoDto());
                return Ok(dto);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving task type repos");
                return StatusCode(500, "Internal server error");
            }
        }

        // API GET: api/TaskTypeRepo/{id}
        [HttpGet]
        [Route("{id}")]
        public async Task<IActionResult> GetTaskTypeRepo(int id)
        {
            try
            {
                var taskTypeRepo = await _taskTypeRepo.GetTaskTypeRepoAsync(id);
                if (taskTypeRepo == null)
                {
                    return NotFound("TaskTypeRepo not found");
                }
                var dto = taskTypeRepo.ToTaskTypeRepoDto();
                return Ok(dto);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error retrieving task type repo with id {id}");
                return StatusCode(500, "Internal server error");
            }
        }

        // API POST: api/TaskTypeRepo
        [HttpPost]
        [Route("")]
        public async Task<IActionResult> CreateTaskTypeRepoAsync(TaskTypeRepoCreateDto taskTypeRepo)
        {
            try
            {
                var dto = taskTypeRepo.ToTaskTypeRepoCreateDto();
                var createdDto = await _taskTypeRepo.CreateTaskTypeRepoAsync(dto);
                var responseDto = createdDto.ToTaskTypeRepoDto();
                return CreatedAtAction(nameof(GetTaskTypeRepo), new { id = createdDto.Id }, responseDto);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating task type repo");
                return StatusCode(500, "Internal server error");
            }
        }

        // API PUT: api/TaskTypeRepo/{id}
        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> UpdateTaskTypeRepoAsync(int id, TaskTypeRepoUpdateDto taskTypeRepo)
        {
            try
            {
                var type = await _taskTypeRepo.GetTaskTypeRepoAsync(id);
                if (type == null)
                {
                    return NotFound("TaskTypeRepo not found");
                }
                var updatedTaskTypeRepo = await _taskTypeRepo.UpdateTaskTypeRepoAsync(id, taskTypeRepo.ToTaskTypeRepoUpdateDto());
                var dto = updatedTaskTypeRepo.ToTaskTypeRepoDto();
                return Ok(dto);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error updating task type repo with id {id}");
                return StatusCode(500, "Internal server error");
            }
        }

        // API DELETE: api/TaskTypeRepo/{id}
        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> DeleteTaskTypeRepoAsync(int id)
        {
            try
            {
                var type = await _taskTypeRepo.GetTaskTypeRepoAsync(id);
                if (type == null)
                {
                    return NotFound("TaskTypeRepo not found");
                }

                var deletedTaskTypeRepo = await _taskTypeRepo.DeleteTaskTypeRepoAsync(id);
                var dto = deletedTaskTypeRepo.ToTaskTypeRepoDto();
                return Ok(dto);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error deleting task type repo with id {id}");
                return StatusCode(500, "Internal server error");
            }
        }
    }
}