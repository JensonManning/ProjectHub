using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace PH_API.Models.Users
{
    public class ProjectRole
    {
        public int Id { get; set;}
        public string Name { get; set;} = string.Empty;
        public List<ProjectUser> ProjectUsers { get; set; } = new List<ProjectUser>();
    }
}