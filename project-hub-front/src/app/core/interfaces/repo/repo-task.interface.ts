import { CategoryRepoSimple } from './repo-category.interface';
import { SubTaskRepo } from './repo-subtask.interface';
import { TaskResourceObject } from './repo-taskresource.interface';
import { TaskTypeRepo, TaskTypeRepoSimple } from './repo-tasktype.interface';

export interface TaskRepo {
    id: number;
    name: string;
    description: string;
    phaseOrder: number;
    hasSubTaskRepo: boolean;
    categoryRepoId: number;
    taskTypeRepoId: number;
    taskTypeRepo: TaskTypeRepoSimple;
    categoryRepo: CategoryRepoSimple;
    taskRepoResources: TaskResourceObject[];
    subTaskRepo: SubTaskRepo[];
}

export interface TaskRepoCreate {
    name: string;
    description: string;
    phaseOrder: number;
    hasSubTaskRepo: boolean;
    categoryRepoId: number;
    taskTypeRepoId: number;
    resourceIds: number[];
}

export interface TaskRepoUpdate {
    name: string;
    description: string;
    phaseOrder: number;
    hasSubTaskRepo: boolean;
    resourceIds: number[];
    categoryRepoId: number;
    taskTypeRepoId: number;
}