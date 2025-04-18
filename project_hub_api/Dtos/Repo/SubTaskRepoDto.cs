using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace project_hub_api.Dtos.Repo
{
    public class SubTaskRepoDto
    {
        public int Id { get; set;}
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int? TaskId { get; set; }
    }

    public class SubTaskRepoCreateDto 
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int? TaskId { get; set; }
    }

    public class SubTaskRepoUpdateDto
    {
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int? TaskId { get; set; }
    }
}