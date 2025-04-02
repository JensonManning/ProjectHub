using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PH_API.Dtos.Projects.Resources;

namespace PH_API.Dtos.Users
{
    public class ProjectUserDto
    {
        public string Id { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public int? RoleId { get; set; } // 1 to Many
        public ProjectRoleSimpleDto? Role { get; set; } // 1 to Many
    }

    public class ProjectUserCreateDto
    {
        public string Id { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public int? RoleId { get; set; } // 1 to Many
        public int ProjectId { get; set; }

    }

    public class ProjectUserUpdateDto
    {
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public int? RoleId { get; set; } // 1 to Many
    }

    public class ProjectUserSimpleDto
    {
        public string Id { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
    }

}