import { ProjectResource } from "./project-resource.interface";
import { ProjectTask } from "./project-task.interface";

export interface ProjectTaskResources {
    projectTaskId: number;
    projectTask: ProjectTask;
    projectResourceId: number;
    projectResource: ProjectResource;
}

export interface ProjectTaskResourcesCreate {
    projectTaskId: number;
    projectResourceId: number;
}

export interface ProjectTaskResourcesUpdate {
    projectTaskId: number;
    projectResourceId: number;
}