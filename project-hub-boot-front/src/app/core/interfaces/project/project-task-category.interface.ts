import { ProjectTask } from "./project-task.interface";

export interface ProjectTaskCategory {
    id: number;
    name: string;
    description: string;
    projectTasks: ProjectTask[];
}

export interface ProjectTaskCategoryCreate {
    id?: number;
    name: string;
    description: string;
    projectId: number;
}

export interface ProjectTaskCategoryUpdate {
    name: string;
    description: string;
}

export interface ProjectTaskCategorySimple {
    id: number;
    name: string;
    description: string;
}
