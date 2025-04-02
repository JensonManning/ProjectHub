import { Routes } from '@angular/router';
import { RepoPhasesComponent } from './repo-phases/repo-phases.component';
import { RepoCategoryComponent } from './repo-category/repo-category.component';
import { RepoTasksComponent } from './repo-tasks/repo-tasks.component';
import { RepoResourcesComponent } from './repo-resources/repo-resources.component';
import { RepoNotebooksComponent } from './repo-notebooks/repo-notebooks.component';
import { RepoTasktypesComponent } from './repo-tasktypes/repo-tasktypes.component';


export default [
    { path: 'phases', component: RepoPhasesComponent, data: { breadcrumb: 'Phases' } },
    { path: 'category', component: RepoCategoryComponent, data: { breadcrumb: 'Categories' } },
    { path: 'tasks', component: RepoTasksComponent, data: { breadcrumb: 'Tasks' } },
    { path: 'resources', component: RepoResourcesComponent, data: { breadcrumb: 'Resources' } },
    { path: 'notebooks', component: RepoNotebooksComponent, data: { breadcrumb: 'Notebooks' } },
    { path: 'tasktypes', component: RepoTasktypesComponent, data: { breadcrumb: 'Task Types' } },
    { path: '**', redirectTo: '/notfound' }
] as Routes;
