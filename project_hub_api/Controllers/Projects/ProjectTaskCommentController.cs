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
    public class ProjectTaskCommentController : ControllerBase
    {
        private readonly ILogger<ProjectTaskCommentController> _logger;
        private readonly IProjectTaskCommentRepository _commentRepository;

        public ProjectTaskCommentController(ILogger<ProjectTaskCommentController> logger, IProjectTaskCommentRepository commentRepository)
        {
            _logger = logger;
            _commentRepository = commentRepository;
        }

        // GET: api/ProjectTaskComment
        [HttpGet]
        public async Task<ActionResult<IEnumerable<ProjectTaskCommentDto>>> GetComments()
        {
            try
            {
                var comments = await _commentRepository.GetProjectTaskCommentsAsync();
                var commentDtos = comments.Select(c => c.ToProjectTaskCommentDto()).ToList();
                return Ok(commentDtos);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving task comments");
                return StatusCode(500, "Internal server error");
            }
        }

        // GET: api/ProjectTaskComment/5
        [HttpGet("{id}")]
        public async Task<ActionResult<ProjectTaskCommentDto>> GetComment(int id)
        {
            try
            {
                var comment = await _commentRepository.GetProjectTaskCommentAsync(id);

                if (comment == null)
                {
                    return NotFound();
                }

                return Ok(comment.ToProjectTaskCommentDto());
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error retrieving task comment with id {id}");
                return StatusCode(500, "Internal server error");
            }
        }

        // POST: api/ProjectTaskComment
        [HttpPost]
        public async Task<ActionResult<ProjectTaskCommentDto>> CreateComment(ProjectTaskCommentCreateDto commentCreateDto)
        {
            try
            {
                var comment = commentCreateDto.ToProjectTaskCommentCreateDto();
                var createdComment = await _commentRepository.AddProjectTaskCommentAsync(comment);
                return CreatedAtAction(nameof(GetComment), new { id = createdComment.Id }, createdComment.ToProjectTaskCommentDto());
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating task comment");
                return StatusCode(500, "Internal server error");
            }
        }

        // PUT: api/ProjectTaskComment/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateComment(int id, ProjectTaskCommentUpdateDto commentUpdateDto)
        {
            try
            {
                // First get the existing comment to preserve the ProjectTaskId
                var existingComment = await _commentRepository.GetProjectTaskCommentAsync(id);
                if (existingComment == null)
                {
                    return NotFound();
                }

                var comment = commentUpdateDto.ToProjectTaskCommentUpdateDto();
                comment.ProjectTaskId = existingComment.ProjectTaskId; // Preserve the ProjectTaskId
                
                var updatedComment = await _commentRepository.UpdateProjectTaskCommentAsync(id, comment);
                
                if (updatedComment == null)
                {
                    return NotFound();
                }

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error updating task comment with id {id}");
                return StatusCode(500, "Internal server error");
            }
        }

        // DELETE: api/ProjectTaskComment/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteComment(int id)
        {
            try
            {
                var comment = await _commentRepository.DeleteProjectTaskCommentAsync(id);
                
                if (comment == null)
                {
                    return NotFound();
                }

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error deleting task comment with id {id}");
                return StatusCode(500, "Internal server error");
            }
        }
    }
}