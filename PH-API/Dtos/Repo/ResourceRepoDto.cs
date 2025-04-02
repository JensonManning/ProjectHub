using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PH_API.Dtos.Repo
{
    public class ResourceRepoDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public List<TaskRepoResourcesDto>? TaskRepoResources { get; set; }
    }

    public class ResourceRepoUpdateCreateDto
    {
        public string Name { get; set; } = string.Empty;
    }

    public class ResourceRepoNoTasksDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
    }

}