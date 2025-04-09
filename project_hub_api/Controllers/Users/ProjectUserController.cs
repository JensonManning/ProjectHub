using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using project_hub_api.IRepositories.Users;
using project_hub_api.Models.Users;
using project_hub_api.Dtos.Users;
using project_hub_api.Mappers.Users;
using System.Security.Principal;
using project_hub_api.Data;
using Microsoft.EntityFrameworkCore;

namespace project_hub_api.Controllers.Users
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProjectUserController : ControllerBase
    {
        private readonly ILogger<ProjectUserController> _logger;
        private readonly IProjectUserRepository _projectUserRepository;
        private readonly AppDbContext _context;

        public ProjectUserController(ILogger<ProjectUserController> logger, IProjectUserRepository projectUserRepository, AppDbContext context)
        {
            _logger = logger;
            _projectUserRepository = projectUserRepository;
            _context = context;
        }

        // GET: api/ProjectUser
        [HttpGet]
        [Route("")]
        public async Task<ActionResult<IEnumerable<ProjectUserDto>>> GetProjectUsers()
        {
            try
            {
                var projectUsers = await _projectUserRepository.GetProjectUsersAsync();
                var projectUserDtos = projectUsers.Select(p => p.ToProjectUserDto()).ToList();
                return Ok(projectUserDtos);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving project users");
                return StatusCode(500, "Internal server error");
            }
        }

        // GET: api/ProjectUser/5
        [HttpGet]
        [Route("{id}")]
        public async Task<ActionResult<ProjectUserDto>> GetProjectUser([FromRoute] string id)
        {
            try
            {
                var projectUser = await _projectUserRepository.GetProjectUserAsync(id);

                if (projectUser == null)
                {
                    return NotFound();
                }

                return Ok(projectUser.ToProjectUserDto());
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error retrieving project user with id {id}");
                return StatusCode(500, "Internal server error");
            }
        }

        // POST: api/ProjectUser
        [HttpPost]
        [Route("")]
        public async Task<ActionResult<ProjectUserDto>> CreateProjectUser([FromBody] ProjectUserCreateDto projectUserCreateDto)
        {
            try
            {
                var projectUser = projectUserCreateDto.ToProjectUserCreateDto();
                var createdProjectUser = await _projectUserRepository.AddProjectUserAsync(projectUser);
                return CreatedAtAction(nameof(GetProjectUser), new { id = createdProjectUser.Id }, createdProjectUser.ToProjectUserDto());
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating project user");
                return StatusCode(500, "Internal server error");
            }
        }

        // PUT: api/ProjectUser/5
        [HttpPut]
        [Route("{id}")]
        public async Task<IActionResult> UpdateProjectUser([FromRoute] string id, [FromBody] ProjectUserUpdateDto projectUserUpdateDto)
        {
            try
            {
                await _projectUserRepository.UpdateProjectUserAsync(id, projectUserUpdateDto.ToProjectUserUpdateDto());
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error updating project user with id {id}");
                return StatusCode(500, "Internal server error");
            }
        }

        // DELETE: api/ProjectUser/5
        [HttpDelete]
        [Route("{id}")]
        public async Task<IActionResult> DeleteProjectUser([FromRoute] string id)
        {
            try
            {
                var projectUser = await _projectUserRepository.DeleteProjectUserAsync(id);
                
                if (projectUser == null)
                {
                    return NotFound();
                }

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error deleting project user with id {id}");
                return StatusCode(500, "Internal server error");
            }
        }

        // API GET: api/ProjectUser/currentuser
        [HttpGet]
        [Route("currentUser")]
        public async Task<IActionResult> GetCurrentUser()
        {
            string currentDomainUserName = WindowsIdentity.GetCurrent().Name;
            string currentUser = currentDomainUserName.Split('\\')[1];
            // PrincipalContext context = new PrincipalContext(ContextType.Domain, "xc.lan", "DC=xc,DC=lan");
            // UserPrincipal user = UserPrincipal.FindByIdentity(context, IdentityType.SamAccountName, currentUser);

            if (currentUser == null)
            {
                return null;
            }
            else
            {
                // Check if user exists in database
                var existingUser = await _context.ProjectUsers
                    .Include(pu => pu.Role)
                    .Select(p => new ProjectUser
                    {
                        Id = p.Id,
                        Name = p.Name,
                        Email = p.Email,
                        Phone = p.Phone,
                        Role = new ProjectRole
                        {
                            Name = p.Role.Name,
                            Id = p.Role.Id
                        }
                    })
                .Where(pu => pu.Id == currentUser)
                .FirstOrDefaultAsync();
                if (existingUser == null)
                {
                    ProjectUser projectUser = new ProjectUser();
                    projectUser.Id = currentUser;
                    projectUser.Email = "";
                    projectUser.Name = "";
                    await _context.ProjectUsers.AddAsync(projectUser);
                    await _context.SaveChangesAsync();
                    return Ok(projectUser);
                }
                else
                {
                    return Ok(existingUser);
                }
            }
        }
    }
} 