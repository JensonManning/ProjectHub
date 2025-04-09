using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace project_hub_api.Models.Repo
{
    public class ResourceRepo
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public List<TaskRepo_ResourceRepo>? TaskRepoResources { get; set; }
    }
}