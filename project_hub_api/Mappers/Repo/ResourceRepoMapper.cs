using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using project_hub_api.Dtos.Repo;
using project_hub_api.Models.Repo;

namespace project_hub_api.Mappers.Repo
{
    public static class ResourceRepoMapper
    {
        public static ResourceRepoDto ToResourceRepoDto(this ResourceRepo resourceRepo) 
        {
            return new ResourceRepoDto
            {
                Id = resourceRepo.Id,
                Name = resourceRepo.Name,
                TaskRepoResources = resourceRepo.TaskRepoResources?.Select(taskRepoResource => taskRepoResource.ToTaskRepoResourcesDto()).ToList() ?? new List<TaskRepoResourcesDto>(),
            };
        }
        public static ResourceRepo ToResourceRepoUpdateCreateDto(this ResourceRepoUpdateCreateDto resourceRepoUpdateCreateDto) 
        {
            return new ResourceRepo
            {
                Name = resourceRepoUpdateCreateDto.Name
            };
        }
        public static ResourceRepoNoTasksDto ToResourceRepoNoTasksDto(this ResourceRepo resourceRepo) 
        {
            return new ResourceRepoNoTasksDto
            {
                Id = resourceRepo.Id,
                Name = resourceRepo.Name
            };
        }
    }
}