using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PH_API.Models.Projects.Resources;

namespace PH_API.Models.Users
{
    public class ProjectUser
    {
        public string Id { get; set; } = string.Empty;
        public string Name { get; set; } = string.Empty;
        public string Email { get; set; } = string.Empty;
        public string Phone { get; set; } = string.Empty;
        public int? RoleId { get; set; } // 1 to Many
        public ProjectRole? Role { get; set; } // 1 to Many
        public List<ProjectResource> ProjectResources { get; set; } = new List<ProjectResource>();

    }
}