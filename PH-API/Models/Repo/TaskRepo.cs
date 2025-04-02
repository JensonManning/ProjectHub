using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PH_API.Models.Repo
{
    public class TaskRepo
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int PhaseOrder { get; set; }
        public bool HasSubTaskRepo { get; set; }

        public int? CategoryRepoId { get; set; } // 1 to 1
        public CategoryRepo? CategoryRepo { get; set; } // 1 to 1
        public int? TaskTypeRepoId { get; set; } // 1 to 1
        public TaskTypeRepo? TaskTypeRepo { get; set; } // 1 to 1
        public List<SubTaskRepo> SubTaskRepo { get; set; } = new List<SubTaskRepo>(); // 1 to many
        public List<TaskRepo_ResourceRepo>? TaskRepoResources { get; set; } // many to many

    }
}