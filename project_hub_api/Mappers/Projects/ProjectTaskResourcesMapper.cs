using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using project_hub_api.Dtos.Projects.Tasks;
using project_hub_api.Models.Projects.Tasks;

namespace project_hub_api.Mappers.Projects
{
    public static class ProjectTaskResourcesMapper
    {
        public static ProjectTaskResourcesDto ToProjectTaskResourcesDto(this ProjectTask_Resource projectTaskResources)
        {
            return new ProjectTaskResourcesDto
            {
                ProjectTaskId = projectTaskResources.ProjectTaskId,
                ProjectTask = projectTaskResources.ProjectTask?.ToProjectTaskSimpleDto(),
                ProjectResourceId = projectTaskResources.ProjectResourceId,
                ProjectResource = projectTaskResources.ProjectResource?.ToProjectResourceSimpleDto()
            };
        }

        public static ProjectTask_Resource ToProjectTaskResourcesCreateDto(this ProjectTaskResourcesCreateDto projectTaskResources)
        {
            return new ProjectTask_Resource
            {
                ProjectTaskId = projectTaskResources.ProjectTaskId,
                ProjectResourceId = projectTaskResources.ProjectResourceId
            };
        }

        public static ProjectTask_Resource ToProjectTaskResourcesUpdateDto(this ProjectTaskResourcesUpdateDto projectTaskResources)
        {
            return new ProjectTask_Resource
            {
                ProjectTaskId = projectTaskResources.ProjectTaskId,
                ProjectResourceId = projectTaskResources.ProjectResourceId
            };
        }

        public static ProjectTaskResourcesSimpleDto ToProjectTaskResourcesSimpleDto(this ProjectTask_Resource projectTaskResources)
        {
            return new ProjectTaskResourcesSimpleDto
            {
                ProjectTaskId = projectTaskResources.ProjectTaskId,
                ProjectResourceId = projectTaskResources.ProjectResourceId,
                ProjectResource = projectTaskResources.ProjectResource?.ToProjectResourceSimpleDto()
            };
        }  
    }
}