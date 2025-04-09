import { Project } from "./project.interface";
import { ProjectTask, ProjectTaskCreate } from "./project-task.interface";
import { ProjectTaskCategory, ProjectTaskCategoryCreate } from "./project-task-category.interface";

export interface ProjectPhase {
    id: number;
    name: string;
    description: string;
    order: number;
    startDate: Date;
    endDate: Date;
    status: number;
    projectId: number;
    project: Project;
    projectTasks: ProjectTask[];
    projectTaskCategories: ProjectTaskCategory[];
}

export interface ProjectPhaseCreate {
    name: string;
    description: string;
    order: number;
    startDate: Date;
    endDate: Date;
    status: number;
    projectId?: number;
    projectTasks: ProjectTaskCreate[];
    projectTaskCategories: ProjectTaskCategoryCreate[];
}

export interface ProjectPhaseUpdate {
    name: string;
    description: string;
    order: number;
    startDate: Date;
    endDate: Date;
}

export interface ProjectPhaseSimple {
    id: number;
    name: string;
    description: string;
    order: number;
    startDate: Date;
    endDate: Date;
    projectId: number;
}
