using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace project_hub_api.Models.Repo
{
    public class CategoryRepo
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public List<TaskRepo> TaskRepo { get; set; } = new List<TaskRepo>();

    }
}