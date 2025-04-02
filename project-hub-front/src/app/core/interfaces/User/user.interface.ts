import { ProjectRole } from "./role.interface";

export interface ProjectUser {
    id: number;
    name: string;
    email: string;
    phone: string;
    roleId: number;
    role: ProjectRole;
}

export interface ProjectUserCreate {
    name: string;
    email: string;
    phone: string;
    roleId: number;
}

export interface ProjectUserUpdate {
    name: string;
    email: string;
    phone: string;
    roleId: number;
}

export interface ProjectUserSimple {
    id: number;
    name: string;
    email: string;
    phone: string;
    roleId: number;
}