import { Project } from "./project.interface";

export interface ProjectTaskComment {
    id: number;
    content: string;
    projectId: number;
    createdAt: Date;
    commentBy: string;
    commentDate: Date;
    
    project: Project;
}

export interface ProjectTaskCommentCreate {
    content: string;
    commentBy: string;
    commentDate: Date;
    projectId: number;
}

export interface ProjectTaskCommentUpdate {
    id: number;
    content: string;
    commentBy: string;
    commentDate: Date;
}

export interface ProjectTaskCommentSimple {
    content: string;
    projectId: number;
    createdAt: Date;
    commentBy: string;
    commentDate: Date;
}