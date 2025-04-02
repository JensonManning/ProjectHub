using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using PH_API.Dtos.Repo;
using PH_API.Models.Repo;

namespace PH_API.Mappers.Repo
{
    public static class TaskTypeRepoMapper
    {
        public static TaskTypeRepoDto ToTaskTypeRepoDto(this TaskTypeRepo taskTypeRepo) 
        {
            return new TaskTypeRepoDto
            {
                Id = taskTypeRepo.Id,
                Name = taskTypeRepo.Name,
                TaskRepos = taskTypeRepo.TaskRepos?.Select(taskRepo => taskRepo.ToTaskRepoDto()).ToList() ?? new List<TaskRepoDto>()
            };
        }

        public static TaskTypeRepo ToTaskTypeRepoCreateDto(this TaskTypeRepoCreateDto taskTypeRepoCreateDto) 
        {
            return new TaskTypeRepo
            {
                Name = taskTypeRepoCreateDto.Name,
                TaskRepos = new List<TaskRepo>()
            };
        }

        public static TaskTypeRepo ToTaskTypeRepoUpdateDto(this TaskTypeRepoUpdateDto taskTypeRepoUpdateDto) 
        {
            return new TaskTypeRepo
            {
                Name = taskTypeRepoUpdateDto.Name,
                TaskRepos = new List<TaskRepo>()
            };
        }

        public static TaskTypeRepoSimpleDto ToTaskTypeRepoSimpleDto(this TaskTypeRepo taskTypeRepo) 
        {
            return new TaskTypeRepoSimpleDto
            {
                Id = taskTypeRepo.Id,
                Name = taskTypeRepo.Name
            };
        }
    }
}