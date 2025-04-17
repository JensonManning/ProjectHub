import { ProjectTask } from "./project-task.interface";

export interface ProjectSubtask {
    id: number;
    name: string;
    description: string;
    projectTaskId: number;
    projectTask: ProjectTask;
}

export interface ProjectSubtaskCreate {
    name: string;
    description: string;
    projectTaskId: number;
}

export interface ProjectSubtaskUpdate {
    name: string;
    description: string;
}

export interface ProjectSubtaskSimple {
    id: number;
    name: string;
    description: string;
    projectTaskId: number;
}
