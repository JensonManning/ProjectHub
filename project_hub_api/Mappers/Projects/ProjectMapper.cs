using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using project_hub_api.Dtos.Projects;
using project_hub_api.Models.Projects;
using project_hub_api.Models.Projects.Tasks;

namespace project_hub_api.Mappers.Projects
{
    public static class ProjectMapper
    {
        public static ProjectDto ToProjectDto(this Project project)
        {
            return new ProjectDto
            {
                Id = project.Id,
                Name = project.Name,
                Description = project.Description,
                Shortcode = project.Shortcode,
                StartDate = project.StartDate,
                EndDate = project.EndDate,
                Status = project.Status,
                Type = project.Type,
                ProjectPhases = project.ProjectPhases.Select(p => p.ToProjectPhaseSimpleDto()).ToList(),
                ProjectNotebooks = project.ProjectNotebooks.Select(p => p.ToProjectNotebookSimpleDto()).ToList(),
                ProjectResources = project.ProjectResources.Select(p => p.ToProjectResourceDto()).ToList()
            };
        }

        public static Project ToProjectCreateDto(this ProjectCreateDto project)
        {
            return new Project
            {
                Name = project.Name,
                Description = project.Description,
                Shortcode = project.Shortcode,
                StartDate = project.StartDate,
                EndDate = project.EndDate,
                Status = project.Status,
                Type = project.Type,
            };
        }

        public static Project ToProjectUpdateDto(this ProjectUpdateDto project)
        {
            return new Project
            {
                Name = project.Name,
                Description = project.Description,
                Shortcode = project.Shortcode,
                StartDate = project.StartDate,
                EndDate = project.EndDate,
                Status = project.Status,
                Type = project.Type,
            };
        }

        public static ProjectSimpleDto ToProjectSimpleDto(this Project project)
        {
            return new ProjectSimpleDto
            {
                Name = project.Name,
                Description = project.Description,
                Shortcode = project.Shortcode,
                StartDate = project.StartDate,
                EndDate = project.EndDate,
                Status = project.Status,
                Type = project.Type,
            };
        }
    }
}