using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace project_hub_api.Models.Notifications
{
    public class Notification
    {
        public int Id { get; set; }
        public string Message { get; set; }
        public DateTime CreatedAt { get; set; }
        public bool IsRead { get; set; }
        public string UserId { get; set; }
        public NotificationType Type { get; set; }
        public string? RelatedEntityId { get; set; }
    }

    public enum NotificationType
    {
        ProjectAssigned,
        TaskAssigned,
        TaskCompleted,
        CommentAdded,
        ReminderDue
    }
}