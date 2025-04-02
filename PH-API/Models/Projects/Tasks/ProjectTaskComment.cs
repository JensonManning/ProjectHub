using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PH_API.Models.Projects.Tasks
{
    public class ProjectTaskComment
    {
        public int Id { get; set;}
        public string Content { get; set; } = string.Empty;
        public DateTime CommentDate { get; set; } = DateTime.Now;
        public string CommentBy { get; set; } = string.Empty;
        
        public int ProjectTaskId { get; set; } // 1 to Many
        public ProjectTask? ProjectTask { get; set; } // 1 to Many
    }
    
}