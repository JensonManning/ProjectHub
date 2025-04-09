using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using project_hub_api.Models.Repo;

namespace project_hub_api.Dtos.Repo
{
    public class TaskTypeRepoDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public List<TaskRepoDto> TaskRepos { get; set; } = new List<TaskRepoDto>();
    }

    public class TaskTypeRepoCreateDto
    {
        public string Name { get; set; } = string.Empty;
    }

    public class TaskTypeRepoUpdateDto
    {
        public string Name { get; set; } = string.Empty;
    }

    public class TaskTypeRepoSimpleDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
    }
}