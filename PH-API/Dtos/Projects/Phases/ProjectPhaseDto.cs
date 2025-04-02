using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PH_API.Dtos.Projects.Tasks;

namespace PH_API.Dtos.Projects.Phases
{
    public class ProjectPhaseDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int Order { get; set; }
        public DateOnly StartDate { get; set; }
        public DateOnly EndDate { get; set; }
        public int ProjectId { get; set; }
        public ProjectSimpleDto? Project { get; set; }
        public List<ProjectTaskSimpleDto> ProjectTasks { get; set;} = new List<ProjectTaskSimpleDto>(); // 1 to Many
        public List<ProjectTaskCategorySimpleDto> ProjectTaskCategories { get; set;} = new List<ProjectTaskCategorySimpleDto>(); // 1 to Many
    }

    public class ProjectPhaseCreateDto
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty; 
        public int Order { get; set; }
        public DateOnly StartDate { get; set; }
        public DateOnly EndDate { get; set; }
        public int ProjectId { get; set; }
    }

    public class ProjectPhaseUpdateDto
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty; 
        public int Order { get; set; }
        public DateOnly StartDate { get; set; }
        public DateOnly EndDate { get; set; }
    }

    public class ProjectPhaseSimpleDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int Order { get; set; }
        public DateOnly StartDate { get; set; }
        public DateOnly EndDate { get; set; }
    }
    
}