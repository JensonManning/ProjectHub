using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using project_hub_api.Models.Projects.Resources;

namespace project_hub_api.Models.Projects.Tasks
{
    public class ProjectTask_Resource
    {
        public int ProjectResourceId { get; set; }
        public ProjectResource? ProjectResource { get; set; }
        public int ProjectTaskId { get; set; }
        public ProjectTask? ProjectTask { get; set; }
    }
}