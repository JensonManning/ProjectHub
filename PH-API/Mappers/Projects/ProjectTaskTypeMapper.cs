using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PH_API.Dtos.Projects.Tasks;
using PH_API.Models.Projects.Tasks;

namespace PH_API.Mappers.Projects
{
    public static class ProjectTaskTypeMapper
    {
        public static ProjectTaskTypeDto ToProjectTaskTypeDto(this ProjectTaskType projectTaskType)
        {
            return new ProjectTaskTypeDto
            {
                Id = projectTaskType.Id,
                Name = projectTaskType.Name,
                Description = projectTaskType.Description,
                ProjectTasks = projectTaskType.ProjectTasks.Select(p => p.ToProjectTaskSimpleDto()).ToList()
            };
        }

        public static ProjectTaskType ToProjectTaskTypeCreateDto(this ProjectTaskTypeCreateDto projectTaskType)
        {
            return new ProjectTaskType
            {
                Name = projectTaskType.Name,
                Description = projectTaskType.Description
            };
        }

        public static ProjectTaskType ToProjectTaskTypeUpdateDto(this ProjectTaskTypeUpdateDto projectTaskType)
        {
            return new ProjectTaskType
            {
                Name = projectTaskType.Name,
                Description = projectTaskType.Description
            };
        }

        public static ProjectTaskTypeSimpleDto ToProjectTaskTypeSimpleDto(this ProjectTaskType projectTaskType)
        {
            return new ProjectTaskTypeSimpleDto
            {
                Id = projectTaskType.Id,
                Name = projectTaskType.Name,
                Description = projectTaskType.Description
            };
        }
    }
}