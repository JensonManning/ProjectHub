using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using project_hub_api.Dtos.Projects.Tasks;
using project_hub_api.Models.Projects.Tasks;

namespace project_hub_api.Mappers.Projects
{
    public static class ProjectTaskCategoryMapper
    {
        public static ProjectTaskCategoryDto ToProjectTaskCategoryDto(this ProjectTaskCategory projectTaskCategory)
        {
            return new ProjectTaskCategoryDto
            {
                Id = projectTaskCategory.Id,
                Name = projectTaskCategory.Name,
                Description = projectTaskCategory.Description,
                ProjectTasks = projectTaskCategory.ProjectTasks.Select(p => p.ToProjectTaskSimpleDto()).ToList()
            };
        }

        public static ProjectTaskCategory ToProjectTaskCategoryCreateDto(this ProjectTaskCategoryCreateDto projectTaskCategory)
        {
            return new ProjectTaskCategory
            {
                Name = projectTaskCategory.Name,
                Description = projectTaskCategory.Description
            };
        }

        public static ProjectTaskCategory ToProjectTaskCategoryUpdateDto(this ProjectTaskCategoryUpdateDto projectTaskCategory)
        {
            return new ProjectTaskCategory
            {
                Name = projectTaskCategory.Name,
                Description = projectTaskCategory.Description
            };
        }

        public static ProjectTaskCategory FromProjectTaskCategorySimpleDto(this ProjectTaskCategorySimpleDto projectTaskCategory)
        {
            return new ProjectTaskCategory
            {
                Id = projectTaskCategory.Id,
                Name = projectTaskCategory.Name,
                Description = projectTaskCategory.Description
            };
        }

        public static ProjectTaskCategorySimpleDto ToProjectTaskCategorySimpleDto(this ProjectTaskCategory projectTaskCategory)
        {
            return new ProjectTaskCategorySimpleDto
            {
                Id = projectTaskCategory.Id,
                Name = projectTaskCategory.Name,
                Description = projectTaskCategory.Description
            };
        }
    }
}