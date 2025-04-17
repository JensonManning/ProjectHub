using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using project_hub_api.Data;
using project_hub_api.Services;

namespace project_hub_api.Controllers.Notifications
{
    [ApiController]
    [Route("api/[controller]")]
    public class NotificationController : ControllerBase
    {
        private readonly AppDbContext _context;
        private readonly NotificationService _notificationService;

        public NotificationController(AppDbContext context, NotificationService notificationService)
        {
            _context = context;
            _notificationService = notificationService;
        }

        [HttpGet("user/{userId}")]
        public async Task<IActionResult> GetUserNotifications()
        {
            string currentDomainUserName = WindowsIdentity.GetCurrent().Name;
            string currentUser = currentDomainUserName.Split('\\')[1];
            // PrincipalContext context = new PrincipalContext(ContextType.Domain, "xc.lan", "DC=xc,DC=lan");
            // UserPrincipal user = UserPrincipal.FindByIdentity(context, IdentityType.SamAccountName, currentUser);

            if (currentUser == null)
            {
                return null;
            }

            var notifications = await _context.Notifications
                .Where(n => n.UserId == currentUser)
                .OrderByDescending(n => n.CreatedAt)
                .ToListAsync();
                
            return Ok(notifications);
        }

        [HttpPut("{id}/read")]
        public async Task<IActionResult> MarkAsRead(int id)
        {
            var notification = await _context.Notifications.FindAsync(id);
            
            if (notification == null)
                return NotFound();
                
            notification.IsRead = true;
            await _context.SaveChangesAsync();
            
            return NoContent();
        }
        
        [HttpPut("read-all")]
        public async Task<IActionResult> MarkAllAsRead()
        {
            string currentDomainUserName = WindowsIdentity.GetCurrent().Name;
            string currentUser = currentDomainUserName.Split('\\')[1];
            // PrincipalContext context = new PrincipalContext(ContextType.Domain, "xc.lan", "DC=xc,DC=lan");
            // UserPrincipal user = UserPrincipal.FindByIdentity(context, IdentityType.SamAccountName, currentUser);

            if (currentUser == null)
            {
                return null;
            }

            var userId = currentUser;
            if (string.IsNullOrEmpty(userId))
                return BadRequest("UserId is required");
                
            var unreadNotifications = await _context.Notifications
                .Where(n => n.UserId == userId && !n.IsRead)
                .ToListAsync();
                
            foreach (var notification in unreadNotifications)
            {
                notification.IsRead = true;
            }
            
            await _context.SaveChangesAsync();
            
            return NoContent();
        }
    }
}