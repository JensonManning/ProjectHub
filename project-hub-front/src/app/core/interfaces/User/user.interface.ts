import { ProjectRole, ProjectRoleSimple } from "./role.interface";

export interface ProjectUser {
    id: string;
    name: string;
    email: string;
    phone: string;
    roleId ?: number;
    role ?: ProjectRoleSimple;
}

export interface ProjectUserCreate {
    name: string;
    email: string;
    phone: string;
    roleId ?: number;
}

export interface ProjectUserUpdate {
    name: string;
    email: string;
    phone: string;
    roleId ? : number;
}

export interface ProjectUserSimple {
    id: string;
    name: string;
    email: string;
    phone: string;
    roleId ?: number;
}