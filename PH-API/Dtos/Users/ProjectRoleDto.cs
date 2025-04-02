using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PH_API.Dtos.Users
{
    public class ProjectRoleDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
        public List<ProjectUserSimpleDto> ProjectUsers { get; set; } = new List<ProjectUserSimpleDto>();
    }
    public class ProjectRoleCreateDto
    {
        public string Name { get; set; } = string.Empty;
    }

    public class ProjectRoleUpdateDto
    {
        public string Name { get; set; } = string.Empty;
    }

    public class ProjectRoleSimpleDto
    {
        public int Id { get; set; }
        public string Name { get; set; } = string.Empty;
    }
}