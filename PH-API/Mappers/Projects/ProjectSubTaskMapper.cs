using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PH_API.Dtos.Projects.Tasks;
using PH_API.Models.Projects.Tasks;

namespace PH_API.Mappers.Projects
{
    public static class ProjectSubTaskMapper
    {
        public static ProjectSubTaskDto ToProjectSubTaskDto(this ProjectSubTask projectSubTask)
        {
            return new ProjectSubTaskDto
            {
                Id = projectSubTask.Id,
                Name = projectSubTask.Name,
                Description = projectSubTask.Description,
                ProjectTaskId = projectSubTask.ProjectTaskId,
                ProjectTask = projectSubTask.ProjectTask?.ToProjectTaskSimpleDto()
            };
        }

        public static ProjectSubTask ToProjectSubTaskCreateDto(this ProjectSubTaskCreateDto projectSubTask)
        {
            return new ProjectSubTask
            {
                Name = projectSubTask.Name,
                Description = projectSubTask.Description,
                ProjectTaskId = projectSubTask.ProjectTaskId
            };
        }

        public static ProjectSubTask ToProjectSubTaskUpdateDto(this ProjectSubTaskUpdateDto projectSubTask)
        {
            return new ProjectSubTask
            {
                Name = projectSubTask.Name,
                Description = projectSubTask.Description,
            };
        }

        public static ProjectSubTaskSimpleDto ToProjectSubTaskSimpleDto(this ProjectSubTask projectSubTask)
        {
            return new ProjectSubTaskSimpleDto
            {
                Id = projectSubTask.Id,
                Name = projectSubTask.Name,
                Description = projectSubTask.Description,
            };
        }
    }
}