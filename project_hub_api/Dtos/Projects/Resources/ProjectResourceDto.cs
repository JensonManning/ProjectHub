using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using project_hub_api.Dtos.Projects.Tasks;
using project_hub_api.Dtos.Users;

namespace project_hub_api.Dtos.Projects.Resources
{
    public class ProjectResourceDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int ProjectId { get; set; }
        public ProjectSimpleDto? Project { get; set; }
        public string? UserId { get; set; } = string.Empty;
        public ProjectUserSimpleDto? User { get; set; }

        public List<ProjectTaskSimpleDto>? ProjectTaskResources { get; set; } // Many to Many
    }
    public class ProjectResourceCreateDto
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int ProjectId { get; set; }
        public string? UserId { get; set; } = string.Empty;
    }

    public class ProjectResourceUpdateDto
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string? UserId { get; set; } = string.Empty;
    }

    public class ProjectResourceSimpleDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string? UserId { get; set; } = string.Empty;
    }
}