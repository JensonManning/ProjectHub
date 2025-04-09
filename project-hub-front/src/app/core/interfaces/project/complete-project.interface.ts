import { ProjectNotebookCreate } from "./project-notebook.interface";
import { ProjectPhase, ProjectPhaseCreate } from "./project-phase.interface";
import { ProjectResourceCreate } from "./project-resource.interface";
import { ProjectTaskCategoryCreate } from "./project-task-category.interface";
import {  ProjectTaskCreate } from "./project-task.interface";
import { ProjectSubtaskCreate } from "./project-subtask.interface";

// Main complete project creation interface
export interface CompleteProjectDto {
    // Base Project information
    name: string;
    description: string;
    shortcode: string;
    startDate: Date | string;
    endDate: Date | string;
    status: number;
    type: number;

    // Related entities
    notebooks: ProjectNotebookCreate[];
    resources: ProjectResourceCreate[];
    phases: CompletePhaseDto[];
}

// Phase with tasks and categories
export interface CompletePhaseDto {
    name: string;
    description: string;
    order: number;
    startDate: Date | string;
    endDate: Date | string;
    status: number;
    
    taskCategories: ProjectTaskCategoryCreate[];
    tasks: CompleteTaskDto[];
}

// Task with subtasks and resources
export interface CompleteTaskDto {
    name: string;
    description: string;
    startDate: Date | string;
    endDate: Date | string;
    projectTaskCategoryId: number;
    hasSubTasks: boolean;
    status: number;
    
    subTasks: ProjectSubtaskCreate[];
    resourceIds: number[];
} 