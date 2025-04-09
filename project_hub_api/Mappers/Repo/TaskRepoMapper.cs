using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using project_hub_api.Dtos.Repo;
using project_hub_api.Models.Repo;

namespace project_hub_api.Mappers.Repo
{
    public static class TaskRepoMapper
    {
        public static TaskRepoDto ToTaskRepoDto(this TaskRepo taskRepo)
        {
            return new TaskRepoDto
            {
                Id = taskRepo.Id,
                Name = taskRepo.Name,
                Description = taskRepo.Description,
                PhaseOrder = taskRepo.PhaseOrder,
                HasSubTaskRepo = taskRepo.HasSubTaskRepo,
                CategoryRepoId = taskRepo.CategoryRepoId,
                CategoryRepo = taskRepo.CategoryRepo?.ToCategoryRepoSimpleDto(),
                TaskTypeRepoId = taskRepo.TaskTypeRepoId,
                TaskTypeRepo = taskRepo.TaskTypeRepo?.ToTaskTypeRepoSimpleDto(),
                SubTaskRepo = taskRepo.SubTaskRepo?.Select(subTaskRepo => subTaskRepo.ToSubTaskRepoDto()).ToList() ?? new List<SubTaskRepoDto>(),
                TaskRepoResources = taskRepo.TaskRepoResources?.Select(taskRepoResource => taskRepoResource.ToTaskRepoResourceObject()).ToList() ?? new List<TaskRepoResourceObject>()
            };
        }
        public static TaskRepo ToTaskRepoCreateDto(this TaskRepoCreateDto taskRepoCreateDto) 
        {
            return new TaskRepo
            {
                Name = taskRepoCreateDto.Name,
                Description = taskRepoCreateDto.Description,
                HasSubTaskRepo = taskRepoCreateDto.HasSubTaskRepo,
                PhaseOrder = taskRepoCreateDto.PhaseOrder,
                CategoryRepoId = taskRepoCreateDto.CategoryRepoId,
                TaskTypeRepoId = taskRepoCreateDto.TaskTypeRepoId,
                SubTaskRepo = taskRepoCreateDto.SubTaskTemplates?.Select(subTaskRepo => subTaskRepo.ToSubTaskRepoCreateDto()).ToList() ?? new List<SubTaskRepo>(),
            };
        }
        public static TaskRepo ToTaskRepoUpdateDto(this TaskRepoUpdateDto taskRepoUpdateDto) 
        {
            return new TaskRepo
            {
                Name = taskRepoUpdateDto.Name,
                Description = taskRepoUpdateDto.Description,
                HasSubTaskRepo = taskRepoUpdateDto.HasSubTaskRepo,
                PhaseOrder = taskRepoUpdateDto.PhaseOrder,
                CategoryRepoId = taskRepoUpdateDto.CategoryRepoId,
                TaskTypeRepoId = taskRepoUpdateDto.TaskTypeRepoId,
                SubTaskRepo = taskRepoUpdateDto.SubTaskTemplates?.Select(subTaskRepo => subTaskRepo.ToSubTaskRepoUpdateDto()).ToList() ?? new List<SubTaskRepo>()
            };
        }
        public static TaskRepoSimpleDto ToTaskRepoSimpleDto(this TaskRepo taskRepo) 
        {
            return new TaskRepoSimpleDto
            {
                Id = taskRepo.Id,
                Name = taskRepo.Name,
                Description = taskRepo.Description,
                PhaseOrder = taskRepo.PhaseOrder,
                HasSubTaskRepo = taskRepo.HasSubTaskRepo,
            };
        }
    }
}