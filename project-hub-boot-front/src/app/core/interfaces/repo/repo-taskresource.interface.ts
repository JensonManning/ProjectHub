import { ResourceRepoNoTasks } from "./repo-resource.interface";

export interface TaskResourceRepo {
    taskRepoId: number;
    resourceRepoId: number;
    resourceRepoName: string;
}

export interface TaskResourceRepoNoTaskId {
    resourceRepoId: number;
    resourceRepoName: string;
}

export interface TaskResourceObject {
    resourceRepo: {
        id: number;
        name: string;
    };
}