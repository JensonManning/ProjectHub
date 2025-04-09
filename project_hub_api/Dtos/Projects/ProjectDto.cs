using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using project_hub_api.Dtos.Projects.Notebooks;
using project_hub_api.Dtos.Projects.Phases;
using project_hub_api.Dtos.Projects.Resources;
using project_hub_api.Dtos.Projects.Tasks;
using static project_hub_api.Models.Projects.Project;

namespace project_hub_api.Dtos.Projects
{
    public class ProjectDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Shortcode { get; set; } = string.Empty;
        public DateOnly StartDate { get; set; }
        public DateOnly EndDate { get; set; }
        public ProjectStatus Status { get; set; }
        public ProjectType Type { get; set; }
        public List<ProjectPhaseSimpleDto> ProjectPhases { get; set; } = new List<ProjectPhaseSimpleDto>();
        public List<ProjectNotebookSimpleDto> ProjectNotebooks { get; set; } = new List<ProjectNotebookSimpleDto>();
        public List<ProjectResourceDto> ProjectResources { get; set; } = new List<ProjectResourceDto>();

    }

    public class ProjectCreateDto
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Shortcode { get; set; } = string.Empty;
        public DateOnly StartDate { get; set; }
        public DateOnly EndDate { get; set; }
        public ProjectStatus Status { get; set; }
        public ProjectType Type { get; set; }
    }

    public class ProjectUpdateDto
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Shortcode { get; set; } = string.Empty;
        public DateOnly StartDate { get; set; }
        public DateOnly EndDate { get; set; }
        public ProjectStatus Status { get; set; }
        public ProjectType Type { get; set; }
    }

    public class ProjectSimpleDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Shortcode { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public DateOnly StartDate { get; set; }
        public DateOnly EndDate { get; set; }
        public ProjectStatus Status { get; set; }
        public ProjectType Type { get; set; }
    }
}