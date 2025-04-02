using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PH_API.Dtos.Users;
using PH_API.Models.Users;

namespace PH_API.Mappers.Users
{
    public static class ProjectUserMapper
    {
        public static ProjectUserDto ToProjectUserDto(this ProjectUser projectUser)
        {
            return new ProjectUserDto
            {
                Id = projectUser.Id,
                Name = projectUser.Name,
                Email = projectUser.Email,
                Phone = projectUser.Phone,
                RoleId = projectUser.RoleId,
                Role = projectUser.Role?.ToProjectRoleSimpleDto()
            };
        }

        public static ProjectUser ToProjectUserCreateDto(this ProjectUserCreateDto projectUser)
        {
            return new ProjectUser
            {
                Name = projectUser.Name,
                Email = projectUser.Email,
                Phone = projectUser.Phone,
                RoleId = projectUser.RoleId
            };
        }

        public static ProjectUser ToProjectUserUpdateDto(this ProjectUserUpdateDto projectUser)
        {
            return new ProjectUser
            {
                Name = projectUser.Name,
                Email = projectUser.Email,
                Phone = projectUser.Phone,
                RoleId = projectUser.RoleId
            };
        }

        public static ProjectUserSimpleDto ToProjectUserSimpleDto(this ProjectUser projectUser)
        {
            return new ProjectUserSimpleDto
            {
                Id = projectUser.Id,
                Name = projectUser.Name,
                Email = projectUser.Email,
                Phone = projectUser.Phone
            };
        }
    }
}