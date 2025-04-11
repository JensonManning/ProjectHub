using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using project_hub_api.Models.Projects.Tasks;
using static project_hub_api.Models.Projects.Tasks.ProjectTask;


namespace project_hub_api.Dtos.Projects.Tasks
{
    public class ProjectTaskDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public DateOnly StartDate { get; set; }
        public DateOnly EndDate { get; set; }
        public ProjectTaskStatus Status { get; set; }
        public int ProjectTaskCategoryId { get; set; }
        public ProjectTaskCategorySimpleDto? ProjectTaskCategory { get; set; }
        public List<ProjectTaskResourcesSimpleDto> ProjectTaskResources { get; set; } = new List<ProjectTaskResourcesSimpleDto>();
        public List<ProjectTaskCommentSimpleDto> ProjectTaskComments { get; set; } = new List<ProjectTaskCommentSimpleDto>();
    }

    public class ProjectTaskCreateDto
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public DateOnly StartDate { get; set; }
        public DateOnly EndDate { get; set; }
        public ProjectTaskStatus Status { get; set; }
        public List<int> ResourceIds { get; set; } = new List<int>();
        public int ProjectTaskCategoryId { get; set; }
    }

    public class ProjectTaskUpdateDto
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public DateOnly StartDate { get; set; }
        public DateOnly EndDate { get; set; }
        public ProjectTaskStatus Status { get; set; }
        public int ProjectTaskCategoryId { get; set; }
    }

    public class ProjectTaskSimpleDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public DateOnly StartDate { get; set; }
        public DateOnly EndDate { get; set; }
        public ProjectTaskStatus Status { get; set; }
        public int ProjectTaskCategoryId { get; set; }
        public ProjectTaskCategorySimpleDto? ProjectTaskCategory { get; set; }
        public List<ProjectTaskResourcesSimpleDto> ProjectTaskResources { get; set; } = new List<ProjectTaskResourcesSimpleDto>();
        public List<ProjectTaskCommentSimpleDto> ProjectTaskComments { get; set; } = new List<ProjectTaskCommentSimpleDto>();

    }
}