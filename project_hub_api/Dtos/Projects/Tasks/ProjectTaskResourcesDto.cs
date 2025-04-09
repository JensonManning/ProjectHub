using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using project_hub_api.Dtos.Projects.Resources;
using project_hub_api.Models.Projects.Resources;
using project_hub_api.Models.Projects.Tasks;

namespace project_hub_api.Dtos.Projects.Tasks
{
    public class ProjectTaskResourcesDto
    {
        public int ProjectTaskId { get; set; }
        public ProjectTaskSimpleDto? ProjectTask { get; set; }
        public int ProjectResourceId { get; set; }
        public ProjectResourceSimpleDto? ProjectResource { get; set; }
    }

    public class ProjectTaskResourcesCreateDto
    {
        public int ProjectTaskId { get; set; }
        public int ProjectResourceId { get; set; }
    }

    public class ProjectTaskResourcesUpdateDto
    {
        public int ProjectTaskId { get; set; }
        public int ProjectResourceId { get; set; }
    }

    public class ProjectTaskResourcesSimpleDto
    {
        public int ProjectTaskId { get; set; }
        public int ProjectResourceId { get; set; }
        public ProjectResourceSimpleDto? ProjectResource { get; set; }
    }
}