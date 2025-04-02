using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PH_API.Models.Repo
{
    public class SubTaskRepo
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int? TaskId { get; set; }
        public TaskRepo? Task { get; set; }
    }
}