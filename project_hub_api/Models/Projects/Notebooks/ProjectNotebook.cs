using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using project_hub_api.Models.Projects;

namespace project_hub_api.Models.Projects.Notebooks
{
    public class ProjectNotebook
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; } = DateTime.Now;
        public string CreatedBy { get; set; } = string.Empty;
        public string UpdatedBy { get; set; } = string.Empty;
        public int ProjectId { get; set; }
        public Project? Project { get; set; }
    }
}