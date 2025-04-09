using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace project_hub_api.Dtos.Repo
{
    public class TaskRepoDto
    {
        public int Id { get; set;}
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int PhaseOrder { get; set; }
        public bool HasSubTaskRepo { get; set; }
        public int? CategoryRepoId { get; set; }
        public int? TaskTypeRepoId { get; set; }
        public TaskTypeRepoSimpleDto? TaskTypeRepo { get; set; }
        public CategoryRepoSimpleDto? CategoryRepo { get; set; } // project_hub_api to project_hub_api
        public List<SubTaskRepoDto>? SubTaskRepo { get; set; } = new List<SubTaskRepoDto>(); // project_hub_api to many
        public List<TaskRepoResourceObject>? TaskRepoResources { get; set; } // many to many
    }

    public class TaskRepoCreateDto 
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int PhaseOrder { get; set; }
        public bool HasSubTaskRepo { get; set; }
        public int? CategoryRepoId { get; set; }
        public int? TaskTypeRepoId { get; set; }
        public List<int> ResourceIds { get; set; } = new List<int>();
        public List<SubTaskRepoCreateDto>? SubTaskTemplates { get; set; } = new List<SubTaskRepoCreateDto>(); 
    }

    public class TaskRepoUpdateDto
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int PhaseOrder { get; set; }
        public bool HasSubTaskRepo { get; set; }
        public int? CategoryRepoId { get; set; }
        public int? TaskTypeRepoId { get; set; }
        public List<int> ResourceIds { get; set; } = new List<int>();
        public List<SubTaskRepoUpdateDto>? SubTaskTemplates { get; set; } = new List<SubTaskRepoUpdateDto>();
    }

    public class TaskRepoSimpleDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int PhaseOrder { get; set; }
        public bool HasSubTaskRepo { get; set; }
    }
}