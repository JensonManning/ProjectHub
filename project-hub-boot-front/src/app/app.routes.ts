import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { ShadcnDemoComponent } from './components/shadcn-demo/shadcn-demo.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';

export const routes: Routes = [
    {
        path: '',
        component: LayoutComponent,
        children: [
            {
                path: 'shadcn-demo',
                component: ShadcnDemoComponent
            },
            {
                path: '',
                component: DashboardComponent
            },
            {
                path: 'repo',
                loadChildren: () => import('./modules/repo/repo.routes')
                
            }
        ]
    }
];