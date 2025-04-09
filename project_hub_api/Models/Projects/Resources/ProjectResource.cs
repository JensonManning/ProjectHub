using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using project_hub_api.Models.Projects;
using project_hub_api.Models.Projects.Tasks;
using project_hub_api.Models.Users;

namespace project_hub_api.Models.Projects.Resources
{
    public class ProjectResource
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int ProjectId { get; set; }
        public Project? Project { get; set; }
        public string? UserId { get; set; } = string.Empty;
        public ProjectUser? User { get; set; }

        public List<ProjectTask_Resource>? ProjectTaskResources { get; set; } // Many to Many
    }
}