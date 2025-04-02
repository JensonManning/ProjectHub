using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PH_API.Dtos.Projects.Notebooks;
using PH_API.Models.Projects.Notebooks;

namespace PH_API.Mappers.Projects
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