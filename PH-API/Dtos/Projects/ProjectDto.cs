using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PH_API.Dtos.Projects.Notebooks;
using PH_API.Dtos.Projects.Phases;
using PH_API.Dtos.Projects.Resources;
using PH_API.Dtos.Projects.Tasks;
using static PH_API.Models.Projects.Project;

namespace PH_API.Dtos.Projects
{
    public class ProjectDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public DateOnly StartDate { get; set; }
        public DateOnly EndDate { get; set; }
        public ProjectStatus Status { get; set; }
        public ProjectType Type { get; set; }
        public List<ProjectPhaseSimpleDto> ProjectPhases { get; set; } = new List<ProjectPhaseSimpleDto>();
        public List<ProjectNotebookSimpleDto> ProjectNotebooks { get; set; } = new List<ProjectNotebookSimpleDto>();
        public List<ProjectResourceSimpleDto> ProjectResources { get; set; } = new List<ProjectResourceSimpleDto>();

    }

    public class ProjectCreateDto
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public DateOnly StartDate { get; set; }
        public DateOnly EndDate { get; set; }
        public ProjectStatus Status { get; set; }
        public ProjectType Type { get; set; }
        public List<ProjectPhaseCreateDto> ProjectPhases { get; set; } = new List<ProjectPhaseCreateDto>();
        public List<ProjectNotebookCreateDto> ProjectNotebooks { get; set; } = new List<ProjectNotebookCreateDto>();
        public List<ProjectResourceCreateDto> ProjectResources { get; set; } = new List<ProjectResourceCreateDto>();
    }

    public class ProjectUpdateDto
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public DateOnly StartDate { get; set; }
        public DateOnly EndDate { get; set; }
        public ProjectStatus Status { get; set; }
        public ProjectType Type { get; set; }
    }

    public class ProjectSimpleDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public DateOnly StartDate { get; set; }
        public DateOnly EndDate { get; set; }
        public ProjectStatus Status { get; set; }
        public ProjectType Type { get; set; }
    }

}