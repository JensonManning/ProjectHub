import { Routes } from "@angular/router";
import { ManageProjectsComponent } from "./manage-projects/manage-projects.component";
import { CreateProjectsV3Component } from "./create-projects-v3/create-projects-v3.component";
import { DetailsProjectComponent } from "./details-project/details-project.component";

export default [
    {
        path: 'manage',
        component: ManageProjectsComponent,
        data: { breadcrumb: 'Manage Projects' }
    },
    {
        path: 'create',
        component: CreateProjectsV3Component,
        data: { breadcrumb: 'Create Project' }
    },
    {
        path: ':id/details',
        component: DetailsProjectComponent,
        data: { breadcrumb: 'Project Details' }
    },
    { path: '**', redirectTo: '/notfound' }
] as Routes;