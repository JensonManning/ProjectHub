import { Routes } from "@angular/router";
import { RepoNotebooksComponent } from "./repo-notebooks/repo-notebooks.component";
import { RepoPhasesComponent } from "./repo-phases/repo-phases.component";
import { RepoResourcesComponent } from "./repo-resources/repo-resources.component";
import { RepoTaskCategoriesComponent } from "./repo-task-categories/repo-task-categories.component";
import { RepoTaskTypesComponent } from "./repo-task-types/repo-task-types.component";
import { RepoTasksComponent } from "./repo-tasks/repo-tasks.component";

export default [
    { path: 'notebooks', component: RepoNotebooksComponent},
    { path: 'phases', component: RepoPhasesComponent},
    { path: 'task-categories', component: RepoTaskCategoriesComponent},
    { path: 'task-types', component: RepoTaskTypesComponent},
    { path: 'tasks', component: RepoTasksComponent},
    { path: 'resources', component: RepoResourcesComponent}
    
] as Routes;
