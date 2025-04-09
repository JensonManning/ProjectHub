import { Routes } from '@angular/router';
import { LayoutComponent } from '@/common/layout/layout.component';
import { DashboardComponent } from '@/modules/dashboard/dashboard.component';
import { NotfoundComponent } from '@/common/notfound/notfound.component';

export const appRoutes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: '',
                loadComponent: () => DashboardComponent,
                data: { breadcrumb: 'Dashboard' }
            },
            {
                path:'repo',
                data: { breadcrumb: 'Repository' },
                loadChildren: () => import('@/modules/repo/repo.routes')
            },
            {
                path: 'projects',
                data: { breadcrumb: 'Projects' },
                loadChildren: () => import('@/modules/projects/projects.routes')
            },
            {
                path: 'users',
                data: { breadcrumb: 'Users' },
                loadChildren: () => import('@/modules/users/user.routes')
            },
            {
                path: 'apps',
                loadChildren: () => import('@/apps/apps.routes'),
                data: { breadcrumb: 'Apps' }
            },
        ]
    },

    { path: 'notfound', component: NotfoundComponent },
    { path: '**', redirectTo: '/notfound' }
];
