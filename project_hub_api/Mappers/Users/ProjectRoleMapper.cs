using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using project_hub_api.Dtos.Users;
using project_hub_api.Models.Users;

namespace project_hub_api.Mappers.Users
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