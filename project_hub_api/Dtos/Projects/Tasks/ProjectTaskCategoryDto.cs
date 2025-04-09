using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace project_hub_api.Dtos.Projects.Tasks
{
    public class ProjectTaskCategoryDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public List<ProjectTaskSimpleDto> ProjectTasks { get; set; } = new List<ProjectTaskSimpleDto>();
    }

    public class ProjectTaskCategoryCreateDto
    {
        public int Id { get; set; } // Optional ID field for reference tracking
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
    }

    public class ProjectTaskCategoryUpdateDto
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
    }

    public class ProjectTaskCategorySimpleDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
    }
}