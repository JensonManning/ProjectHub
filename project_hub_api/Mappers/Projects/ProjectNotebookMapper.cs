using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using project_hub_api.Dtos.Projects.Notebooks;
using project_hub_api.Models.Projects.Notebooks;

namespace project_hub_api.Mappers.Projects
{
    public static class ProjectNotebookMapper
    {
        public static ProjectNotebookDto ToProjectNotebookDto(this ProjectNotebook projectNotebook)
        {
            return new ProjectNotebookDto
            {
                Id = projectNotebook.Id,
                Name = projectNotebook.Name,
                Description = projectNotebook.Description,
                Content = projectNotebook.Content,
                ProjectId = projectNotebook.ProjectId,
                Project = projectNotebook.Project?.ToProjectSimpleDto()
            };
        }

        public static ProjectNotebook ToProjectNotebookCreateDto(this ProjectNotebookCreateDto projectNotebook)
        {
            return new ProjectNotebook
            {
                Name = projectNotebook.Name,
                Description = projectNotebook.Description,
                ProjectId = projectNotebook.ProjectId
            };
        }

        public static ProjectNotebook ToProjectNotebookUpdateDto(this ProjectNotebookUpdateDto projectNotebook)
        {
            return new ProjectNotebook
            {
                Name = projectNotebook.Name,
                Description = projectNotebook.Description
            };
        }

        public static ProjectNotebookSimpleDto ToProjectNotebookSimpleDto(this ProjectNotebook projectNotebook)
        {
            return new ProjectNotebookSimpleDto
            {
                Id = projectNotebook.Id,
                Name = projectNotebook.Name,
                Description = projectNotebook.Description,
                Content = projectNotebook.Content,
            };
        }
    }
}