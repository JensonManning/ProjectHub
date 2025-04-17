import { Project } from "./project.interface";

export interface ProjectNotebook {
    id: number;
    name: string;
    description: string;
    content: string;
    projectId: number;
    project: Project;
}

export interface ProjectNotebookCreate {
    name: string;
    description: string;
    content: string;
    projectId: number;
}

export interface ProjectNotebookUpdate {
    name: string;
    description: string;
    content: string;
}

export interface ProjectNotebookSimple {
    id: number;
    name: string;
    description: string;
    content: string;
    projectId: number;
}