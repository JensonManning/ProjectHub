import { ProjectUser } from "./user.interface";

export interface ProjectRole {
    id: number;
    name: string;
    projectUsers: ProjectUser[];
}

export interface ProjectRoleCreate {
    name: string;
}

export interface ProjectRoleUpdate {
    name: string;
}

export interface ProjectRoleSimple {
    id: number;
    name: string;
}