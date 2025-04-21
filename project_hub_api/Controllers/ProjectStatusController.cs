using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using project_hub_api.Services;

namespace project_hub_api.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectStatusController : ControllerBase
    {
        private readonly ProjectStatusService _projectStatusService;
        private readonly ILogger<ProjectStatusController> _logger;

        public ProjectStatusController(
            ProjectStatusService projectStatusService,
            ILogger<ProjectStatusController> logger)
        {
            _projectStatusService = projectStatusService;
            _logger = logger;
        }

        [HttpPost("update")]
        public async Task<IActionResult> UpdateProjectStatuses()
        {
            _logger.LogInformation("Manual update of project statuses triggered");
            await _projectStatusService.UpdateProjectStatuses();
            return Ok(new { message = "Project statuses updated successfully" });
        }
    }
} 