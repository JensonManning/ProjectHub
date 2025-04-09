using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using project_hub_api.Dtos.Repo;
using project_hub_api.Models.Repo;

namespace project_hub_api.Mappers.Repo
{
    public static class NotebookRepoMapper
    {
        public static NotebookRepoDto ToNotebookRepoDto(this NotebookRepo notebookRepo) 
        {
            return new NotebookRepoDto
            {
                Id = notebookRepo.Id,
                Name = notebookRepo.Name,
                Description = notebookRepo.Description,
                Content = notebookRepo.Content
            };
        }

        public static NotebookRepo ToNotebookRepoCreateDto(this NotebookRepoCreateDto notebookRepoCreate) 
        {
            return new NotebookRepo
            {
                Name = notebookRepoCreate.Name,
                Description = notebookRepoCreate.Description,
                Content = notebookRepoCreate.Content
            };
        }

        public static NotebookRepo ToNotebookRepoUpdateDto(this NotebookRepoUpdateDto notebookRepoUpdate) 
        {
            return new NotebookRepo
            {
                Name = notebookRepoUpdate.Name,
                Description = notebookRepoUpdate.Description,
                Content = notebookRepoUpdate.Content
            };
        }
    }
}