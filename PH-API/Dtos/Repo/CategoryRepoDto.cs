using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PH_API.Dtos.Repo
{
    public class CategoryRepoDto
    {
        public int Id { get; set;}
        public string Name { get; set;} = string.Empty;
        public string Description { get; set;} = string.Empty;
        public List<TaskRepoDto>? TaskRepo { get; set; } = new List<TaskRepoDto>();
    }

    public class CategoryRepoCreateDto
    {
        public string Name { get; set;} = string.Empty;
        public string Description { get; set;} = string.Empty;
    }

    public class CategoryRepoUpdateDto
    {
        public string Name { get; set;} = string.Empty;
        public string Description { get; set;} = string.Empty;
    }

    public class CategoryRepoSimpleDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
    }
}