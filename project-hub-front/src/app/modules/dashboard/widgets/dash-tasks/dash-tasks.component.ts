import { Component, inject, OnDestroy } from '@angular/core';
import { DashTasksListComponent } from './dash-tasks-list/dash-tasks-list.component';
import { DashTasksCreateComponent } from './dash-tasks-create/dash-tasks-create.component';
import { Task } from '@/types/task';
import { Subscription } from 'rxjs';
import { TaskService } from '@/core/services/dummy/task.service';
import { ProjectTaskService } from '@/core/services/project/project-task.service';
@Component({
    selector: 'app-dash-tasks',
    imports: [DashTasksListComponent, DashTasksCreateComponent],
    templateUrl: './dash-tasks.component.html',
    styleUrl: './dash-tasks.component.scss',
    providers: [TaskService]
})
export class DashTasksComponent implements OnDestroy {
    pTaskService = inject(ProjectTaskService);

    subscription: Subscription;

    tasks: Task[] = [];

    completed: Task[] = [];

    constructor(private taskService: TaskService) {
        this.subscription = this.taskService.taskSource$.subscribe((data) => this.categorize(data));
    }

    categorize(tasks: Task[]) {
        this.tasks = tasks.filter((t) => t.completed !== true);
        this.completed = tasks.filter((t) => t.completed);
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    showDialog() {
        this.taskService.showDialog('Create Task', true);
    }
}
