import { Routes } from '@angular/router';

export default [
    {
        path: 'kanban',
        loadComponent: () => import('./kanban').then((c) => c.Kanban),
        data: { breadcrumb: 'Kanban' }
    }
] as Routes;
