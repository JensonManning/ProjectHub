using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PH_API.Models.Projects.Tasks
{
    public class ProjectTaskCategory
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public List<ProjectTask> ProjectTasks { get; set; } = new List<ProjectTask>();
    }
}