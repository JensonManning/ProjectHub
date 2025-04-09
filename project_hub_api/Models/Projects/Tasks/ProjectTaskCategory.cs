using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using project_hub_api.Models.Projects.Phases;

namespace project_hub_api.Models.Projects.Tasks
{
    public class ProjectTaskCategory
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int? ProjectPhaseId { get; set; }
        public ProjectPhase? ProjectPhase { get; set; }
        public List<ProjectTask> ProjectTasks { get; set; } = new List<ProjectTask>();
    }
}