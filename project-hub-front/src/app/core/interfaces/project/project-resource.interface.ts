import { User } from "@/types/user";
import { Project } from "./project.interface";

export interface ProjectResource {
    id: number;
    name: string;
    description: string;
    projectId: number;
    project: Project;
    userId: number;
    user: User;
}

export interface ProjectResourceCreate {
    name: string;
    description: string;
    projectId: number;
    userId: number;
}

export interface ProjectResourceUpdate {
    name: string;
    description: string;
    userId: number;
}

export interface ProjectResourceSimple {
    id: number;
    name: string;
    description: string;
    projectId: number;
}