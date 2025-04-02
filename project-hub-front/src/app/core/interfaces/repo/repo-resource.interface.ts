import { TaskRepo } from "./repo-task.interface";

export interface ResourceRepo {
    id:  number;
    name: string;
    taskRepo : TaskRepo[];
}

export interface ResourceRepoNoTasks {
    id:  number;
    name: string;
}