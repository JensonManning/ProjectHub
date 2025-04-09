import { Routes } from "@angular/router";
import { ManageUsersComponent } from "./manage-users/manage-users.component";
import { ManageRolesComponent } from "./manage-roles/manage-roles.component";

export default [
    {
        path: 'manage',
        component: ManageUsersComponent,
        data: { breadcrumb: 'Manage Users' }
    },
    {
        path: 'roles/manage',
        component: ManageRolesComponent,
        data: { breadcrumb: 'Manage Roles' }
    }
] as Routes;

