using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using project_hub_api.Dtos.Projects.Phases;
using project_hub_api.Models.Projects.Phases;

namespace project_hub_api.Mappers.Projects
{
    public static class ProjectPhaseMapper
    {
        public static ProjectPhaseDto ToProjectPhaseDto(this ProjectPhase projectPhase)
        {
            return new ProjectPhaseDto
            {
                Id = projectPhase.Id,
                Name = projectPhase.Name,
                Description = projectPhase.Description,
                Order = projectPhase.Order,
                Status = projectPhase.Status,
                StartDate = projectPhase.StartDate,
                EndDate = projectPhase.EndDate,
                ProjectId = projectPhase.ProjectId,
                Project = projectPhase.Project?.ToProjectSimpleDto(),
                ProjectTaskCategories = projectPhase.ProjectTaskCategories.Select(p => p.ToProjectTaskCategorySimpleDto()).ToList(),
                ProjectTasks = projectPhase.ProjectTasks.Select(p => p.ToProjectTaskSimpleDto()).ToList()
            };
        }

        public static ProjectPhase ToProjectPhaseCreateDto(this ProjectPhaseCreateDto projectPhase)
        {
            return new ProjectPhase
            {
                Name = projectPhase.Name,
                Description = projectPhase.Description,
                Order = projectPhase.Order,
                Status = projectPhase.Status,
                StartDate = projectPhase.StartDate,
                EndDate = projectPhase.EndDate,
            };
        }

        public static ProjectPhase ToProjectPhaseUpdateDto(this ProjectPhaseUpdateDto projectPhase)
        {
            return new ProjectPhase
            {
                Name = projectPhase.Name,
                Description = projectPhase.Description,
                Order = projectPhase.Order,
                Status = projectPhase.Status,
                StartDate = projectPhase.StartDate,
                EndDate = projectPhase.EndDate
            };
        }

        public static ProjectPhaseSimpleDto ToProjectPhaseSimpleDto(this ProjectPhase projectPhase)
        {
            return new ProjectPhaseSimpleDto
            {
                Id = projectPhase.Id,
                Name = projectPhase.Name,
                Description = projectPhase.Description,
                Order = projectPhase.Order,
                Status = projectPhase.Status,
                StartDate = projectPhase.StartDate,
                EndDate = projectPhase.EndDate,
                ProjectTaskCategories = projectPhase.ProjectTaskCategories.Select(p => p.ToProjectTaskCategorySimpleDto()).ToList(),
                ProjectTasks = projectPhase.ProjectTasks.Select(p => p.ToProjectTaskSimpleDto()).ToList()
            };
        }
    }
}