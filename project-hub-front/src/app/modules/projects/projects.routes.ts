import { Routes } from "@angular/router";
import { ManageProjectsComponent } from "./manage-projects/manage-projects.component";
import { CreateProjectsComponent } from "./create-projects/create-projects.component";

export default [
    {
        path: 'manage',
        component: ManageProjectsComponent,
        data: { breadcrumb: 'Manage Projects' }
    },
    {
        path: 'create',
        component: CreateProjectsComponent,
        data: { breadcrumb: 'Create Project' }
    },
    { path: '**', redirectTo: '/notfound' }
] as Routes;