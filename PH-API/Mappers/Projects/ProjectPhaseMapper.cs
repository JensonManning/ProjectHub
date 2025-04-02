using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PH_API.Dtos.Projects.Phases;
using PH_API.Models.Projects.Phases;

namespace PH_API.Mappers.Projects
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
                StartDate = projectPhase.StartDate,
                EndDate = projectPhase.EndDate,
                ProjectId = projectPhase.ProjectId
            };
        }

        public static ProjectPhase ToProjectPhaseUpdateDto(this ProjectPhaseUpdateDto projectPhase)
        {
            return new ProjectPhase
            {
                Name = projectPhase.Name,
                Description = projectPhase.Description,
                Order = projectPhase.Order,
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
                StartDate = projectPhase.StartDate,
                EndDate = projectPhase.EndDate
            };
        }
    }
}