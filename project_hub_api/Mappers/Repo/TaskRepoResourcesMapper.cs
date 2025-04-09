using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using project_hub_api.Dtos.Repo;
using project_hub_api.Models.Repo;

namespace project_hub_api.Mappers.Repo
{
    public static class TaskRepoResourcesMapper
    {
        public static TaskRepoResourcesDto ToTaskRepoResourcesDto(this TaskRepo_ResourceRepo taskRepoResources) 
        {
            return new TaskRepoResourcesDto
            {
                TaskRepoId = taskRepoResources.TaskRepoId,
                ResourceRepoId = taskRepoResources.ResourceRepoId,
                ResourceRepoName = taskRepoResources.ResourceRepoName
            };
        }

        public static TaskRepoResourcesNoTaskIdDto ToTaskRepoResourcesNoTaskIdDto(this TaskRepo_ResourceRepo taskRepoResources) 
        {
            return new TaskRepoResourcesNoTaskIdDto
            {
                ResourceRepoId = taskRepoResources.ResourceRepoId,
                ResourceRepoName = taskRepoResources.ResourceRepoName
            };
        }

        public static TaskRepoResourceObject ToTaskRepoResourceObject(this TaskRepo_ResourceRepo taskRepoResources) 
        {
            return new TaskRepoResourceObject
            {
                ResourceRepo = taskRepoResources.ResourceRepo?.ToResourceRepoNoTasksDto(),
            };
        }
    }
}