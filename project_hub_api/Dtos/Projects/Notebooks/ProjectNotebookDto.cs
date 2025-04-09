using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace project_hub_api.Dtos.Projects.Notebooks
{
    public class ProjectNotebookDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public int ProjectId { get; set; }
        public ProjectSimpleDto? Project { get; set; }
    }

    public class ProjectNotebookCreateDto 
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
        public int ProjectId { get; set; }
    }

    public class ProjectNotebookUpdateDto
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
    }

    public class ProjectNotebookSimpleDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string Content { get; set; } = string.Empty;
    }
}