using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PH_API.Dtos.Projects.Tasks
{
    public class ProjectTaskCommentDto
    {
        public int Id { get; set; }
        public string Content { get; set; } = string.Empty;
        public string CommentBy { get; set; } = string.Empty;
        public DateTime CommentDate { get; set; } = DateTime.Now;
        public int ProjectTaskId { get; set; }
        public ProjectTaskSimpleDto? ProjectTask { get; set; }
    }

    public class ProjectTaskCommentCreateDto
    {
        public string Content { get; set; } = string.Empty;       
        public string CommentBy { get; set; } = string.Empty;
        public DateTime CommentDate { get; set; } = DateTime.Now;
        public int ProjectTaskId { get; set; }
    }

    public class ProjectTaskCommentUpdateDto
    {
        public string Content { get; set; } = string.Empty;
        public string CommentBy { get; set; } = string.Empty;
        public DateTime CommentDate { get; set; } = DateTime.Now;
    }

    public class ProjectTaskCommentSimpleDto
    {
        public int Id { get; set; }
        public string Content { get; set; } = string.Empty;
        public string CommentBy { get; set; } = string.Empty;
        public DateTime CommentDate { get; set; } = DateTime.Now;
    }
}