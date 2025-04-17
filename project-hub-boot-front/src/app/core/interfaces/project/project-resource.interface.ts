import { ProjectUser } from "../User/user.interface";
import { Project } from "./project.interface";

export interface ProjectResource {
    id: number;
    name: string;
    description: string;
    projectId: number;
    project: Project;
    userId: string;
    user: ProjectUser;
}

export interface ProjectResourceCreate {
    name: string;
    description: string;
    projectId: number;
    userId: string;
}

export interface ProjectResourceUpdate {
    name: string;
    description: string;
    userId: string;
}

export interface ProjectResourceSimple {
    id: number;
    name: string;
    description: string;
    projectId: number;
}