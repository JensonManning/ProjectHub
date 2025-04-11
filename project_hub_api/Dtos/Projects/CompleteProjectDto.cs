using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;
using project_hub_api.Dtos.Projects.Notebooks;
using project_hub_api.Dtos.Projects.Phases;
using project_hub_api.Dtos.Projects.Resources;
using project_hub_api.Dtos.Projects.Tasks;
using project_hub_api.Models.Projects.Phases;
using project_hub_api.Models.Projects.Tasks;
using static project_hub_api.Models.Projects.Phases.ProjectPhase;
using static project_hub_api.Models.Projects.Project;
using static project_hub_api.Models.Projects.Tasks.ProjectTask;

namespace project_hub_api.Dtos.Projects
{
    public class CompleteProjectDto
    {
        // Base Project information
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Shortcode { get; set; } = string.Empty;
        public DateOnly StartDate { get; set; }
        public DateOnly EndDate { get; set; }
        public ProjectStatus Status { get; set; }
        public ProjectType Type { get; set; }

        // Related entities
        [JsonPropertyName("projectNotebooks")]
        public List<ProjectNotebookCreateDto> Notebooks { get; set; } = new List<ProjectNotebookCreateDto>();
        
        [JsonPropertyName("projectResources")]
        public List<ProjectResourceCreateDto> Resources { get; set; } = new List<ProjectResourceCreateDto>();
        
        [JsonPropertyName("projectPhases")]
        public List<CompletePhaseDto> Phases { get; set; } = new List<CompletePhaseDto>();
    }

    // Phase with tasks and categories
    public class CompletePhaseDto
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int Order { get; set; }
        public DateOnly StartDate { get; set; }
        public DateOnly EndDate { get; set; }
        public PhaseStatus Status { get; set; }
        
        [JsonPropertyName("projectTaskCategories")]
        public List<ProjectTaskCategoryCreateDto> TaskCategories { get; set; } = new List<ProjectTaskCategoryCreateDto>();
        
        [JsonPropertyName("projectTasks")]
        public List<CompleteTaskDto> Tasks { get; set; } = new List<CompleteTaskDto>();
    }

    // Task with subtasks and resources
    public class CompleteTaskDto
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public DateOnly StartDate { get; set; }
        public DateOnly EndDate { get; set; }
        public int ProjectTaskCategoryId { get; set; }
        public bool HasSubTasks { get; set; }
        public ProjectTaskStatus Status { get; set; }
        
        [JsonPropertyName("projectSubTask")]
        public List<ProjectSubTaskCreateDto> SubTasks { get; set; } = new List<ProjectSubTaskCreateDto>();
        
        [JsonPropertyName("resourceIds")]
        public List<int> ResourceIds { get; set; } = new List<int>();
    }
} 