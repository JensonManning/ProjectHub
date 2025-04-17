import { TaskRepo } from "./repo-task.interface";

export interface TaskTypeRepo {
    id: number;
    name: string;
    taskRepo : TaskRepo[];
}

export interface TaskTypeRepoCreate {
    name: string;
}

export interface TaskTypeRepoUpdate {
    name: string;
}

export interface TaskTypeRepoSimple {
    id: number;
    name: string;
}