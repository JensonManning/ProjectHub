using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PH_API.Models.Repo
{
    public class TaskRepo_ResourceRepo
    {
        public int TaskRepoId { get; set; }
        public int ResourceRepoId { get; set; }
        public TaskRepo? TaskRepo { get; set; }
        public ResourceRepo? ResourceRepo { get; set; }
        public string? ResourceRepoName { get; set; } = string.Empty;
    }
}