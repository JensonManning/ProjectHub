using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PH_API.Dtos.Repo;
using PH_API.Models.Repo;

namespace PH_API.Mappers.Repo
{
    public static class SubTaskRepoMapper
    {
         public static SubTaskRepoDto ToSubTaskRepoDto(this SubTaskRepo subTaskRepo) 
         {
            return new SubTaskRepoDto
            {
                Id = subTaskRepo.Id,
                Name = subTaskRepo.Name,
                Description = subTaskRepo.Description,
                TaskId = subTaskRepo.TaskId
            };
         }
         
         public static SubTaskRepo ToSubTaskRepoCreateDto(this SubTaskRepoCreateDto subTaskRepoCreateDto) 
         {
            return new SubTaskRepo
            {
                Name = subTaskRepoCreateDto.Name,
                Description = subTaskRepoCreateDto.Description,
                TaskId = subTaskRepoCreateDto.TaskId
            };
         }

         public static SubTaskRepo ToSubTaskRepoUpdateDto(this SubTaskRepoUpdateDto subTaskRepoUpdateDto) 
         {
            return new SubTaskRepo
            {
                Name = subTaskRepoUpdateDto.Name,
                Description = subTaskRepoUpdateDto.Description,
                TaskId = subTaskRepoUpdateDto.TaskId
            };
         }
    }
}