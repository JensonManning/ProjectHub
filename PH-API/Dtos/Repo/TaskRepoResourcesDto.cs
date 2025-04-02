using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PH_API.Dtos.Repo
{
    public class TaskRepoResourcesDto
    {
        public int TaskRepoId { get; set; }
        public int ResourceRepoId { get; set; }
        public string? ResourceRepoName { get; set; } = string.Empty;
    }

    public class TaskRepoResourcesNoTaskIdDto 
    {
        public int ResourceRepoId { get; set; }
        public string? ResourceRepoName { get; set; } = string.Empty;
    }
    public class TaskRepoResourceObject
    {
        public ResourceRepoNoTasksDto? ResourceRepo { get; set; }
    }
}