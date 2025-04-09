import { ProjectSubtaskCreate } from "./project-subtask.interface";
import { ProjectTaskCategory } from "./project-task-category.interface";
import { ProjectTaskComment } from "./project-task-comment.interface";
import { ProjectTaskResources } from "./project-task-resources.interface";

export interface ProjectTask {
    id: number;
    name: string;
    description: string;
    status: number;
    startDate: Date;
    endDate: Date;
    hasSubTasks: boolean;
    projectPhaseId: number;
    projectTaskTypeId: number;
    projectTaskResources: ProjectTaskResources[];
    projectTaskCategories: ProjectTaskCategory[];
    projectTaskComments: ProjectTaskComment[];
}

export interface ProjectTaskCreate {
    name: string;
    description: string;
    status: number;
    startDate: Date;
    endDate: Date;
    hasSubTasks: boolean;
    projectPhaseId: number;
    projectSubTask : ProjectSubtaskCreate[] | null;
    projectTaskCategoryId: number;
    resourceIds: number[];
}

export interface ProjectTaskUpdate {
    name: string;
    description: string;
    status: number;
    startDate: Date;
    endDate: Date;
    hasSubTasks: boolean;
}