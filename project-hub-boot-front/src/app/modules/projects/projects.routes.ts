import { Routes } from "@angular/router";
import { CreateProjectComponent } from "./create-project/create-project.component";
import { DetailsProjectComponent } from "./details-project/details-project.component";
import { ManageProjectsComponent } from "./manage-projects/manage-projects.component";

export default [
    {
        path: 'manage',
        component: ManageProjectsComponent,
    },
    {
        path: 'create',
        component: CreateProjectComponent,
    },
    {
        path: ':id/details',
        component: DetailsProjectComponent,
    },
    { path: '**', redirectTo: '/notfound' }
] as Routes;