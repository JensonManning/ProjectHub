using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PH_API.Dtos.Projects.Resources;
using PH_API.Models.Projects.Resources;
using PH_API.Mappers.Users;

namespace PH_API.Mappers.Projects
{
    public static class ProjectResourceMapper
    {
        public static ProjectResourceDto ToProjectResourceDto(this ProjectResource projectResource)
        {
            return new ProjectResourceDto
            {
                Id = projectResource.Id,
                Name = projectResource.Name,
                Description = projectResource.Description,
                ProjectId = projectResource.ProjectId,
                Project = projectResource.Project?.ToProjectSimpleDto(),
                UserId = projectResource.UserId,
                User = projectResource.User?.ToProjectUserSimpleDto()
            };
        }

        public static ProjectResource ToProjectResourceCreateDto(this ProjectResourceCreateDto projectResource)
        {
            return new ProjectResource
            {
                Name = projectResource.Name,
                Description = projectResource.Description,
                ProjectId = projectResource.ProjectId,
                UserId = projectResource.UserId
            };
        }

        public static ProjectResource ToProjectResourceUpdateDto(this ProjectResourceUpdateDto projectResource)
        {
            return new ProjectResource
            {
                Name = projectResource.Name,
                Description = projectResource.Description,
                UserId = projectResource.UserId
            };
        }

        public static ProjectResourceSimpleDto ToProjectResourceSimpleDto(this ProjectResource projectResource)
        {
            return new ProjectResourceSimpleDto
            {
                Id = projectResource.Id,
                Name = projectResource.Name,
                Description = projectResource.Description,
            };
        }
    }
}