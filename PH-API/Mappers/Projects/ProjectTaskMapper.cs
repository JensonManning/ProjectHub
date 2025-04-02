using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PH_API.Dtos.Projects.Tasks;
using PH_API.Models.Projects.Tasks;

namespace PH_API.Mappers.Projects
{
    public static class ProjectTaskMapper
    {
        public static ProjectTaskDto ToProjectTaskDto(this ProjectTask projectTask)
        {
            return new ProjectTaskDto
            {
                Id = projectTask.Id,
                Name = projectTask.Name,
                Description = projectTask.Description,
                StartDate = projectTask.StartDate,
                EndDate = projectTask.EndDate,
                ProjectTaskTypeId = projectTask.ProjectTaskTypeId,
                ProjectTaskType = projectTask.ProjectTaskType?.ToProjectTaskTypeSimpleDto(),
                ProjectTaskCategoryId = projectTask.ProjectTaskCategoryId,
                ProjectTaskCategory = projectTask.ProjectTaskCategory?.ToProjectTaskCategorySimpleDto(),
                ProjectTaskComments = projectTask.ProjectTaskComments.Select(p => p.ToProjectTaskCommentSimpleDto()).ToList()
            };
        }

        public static ProjectTask ToProjectTaskCreateDto(this ProjectTaskCreateDto projectTask)
        {
            return new ProjectTask
            {
                Name = projectTask.Name,
                Description = projectTask.Description,
                StartDate = projectTask.StartDate,
                EndDate = projectTask.EndDate,
                ProjectTaskTypeId = projectTask.ProjectTaskTypeId,
                ProjectTaskCategoryId = projectTask.ProjectTaskCategoryId
            };
        }

        public static ProjectTask ToProjectTaskUpdateDto(this ProjectTaskUpdateDto projectTask)
        {
            return new ProjectTask
            {
                Name = projectTask.Name,
                Description = projectTask.Description,
                StartDate = projectTask.StartDate,
                EndDate = projectTask.EndDate,
                ProjectTaskTypeId = projectTask.ProjectTaskTypeId,
                ProjectTaskCategoryId = projectTask.ProjectTaskCategoryId
            };
        }

        public static ProjectTaskSimpleDto ToProjectTaskSimpleDto(this ProjectTask projectTask)
        {
            return new ProjectTaskSimpleDto
            {
                Id = projectTask.Id,
                Name = projectTask.Name,
                Description = projectTask.Description,
                StartDate = projectTask.StartDate,
                EndDate = projectTask.EndDate,
            };
        }
    }
}