using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PH_API.Dtos.Users;
using PH_API.Models.Users;

namespace PH_API.Mappers.Users
{
    public static class ProjectRoleMapper
    {
        public static ProjectRoleDto ToProjectRoleDto(this ProjectRole projectRole)
        {
            return new ProjectRoleDto
            {
                Id = projectRole.Id,
                Name = projectRole.Name,
                ProjectUsers = projectRole.ProjectUsers.Select(p => p.ToProjectUserSimpleDto()).ToList()
            };
        }

        public static ProjectRole ToProjectRoleCreateDto(this ProjectRoleCreateDto projectRole)
        {
            return new ProjectRole
            {
                Name = projectRole.Name
            };
        }

        public static ProjectRole ToProjectRoleUpdateDto(this ProjectRoleUpdateDto projectRole)
        {
            return new ProjectRole
            {
                Name = projectRole.Name
            };
        }

        public static ProjectRoleSimpleDto ToProjectRoleSimpleDto(this ProjectRole projectRole)
        {
            return new ProjectRoleSimpleDto
            {
                Id = projectRole.Id,
                Name = projectRole.Name
            };
        }
    }
}