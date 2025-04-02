import { ChangeDetectionStrategy, Component, Input, OnInit, ViewChild } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Menu, MenuModule } from 'primeng/menu';
import { TaskService } from '@/core/services/dummy/task.service';
import { CommonModule } from '@angular/common';
import { CheckboxModule } from 'primeng/checkbox';
import { AvatarGroupModule } from 'primeng/avatargroup';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { FormsModule } from '@angular/forms';
import { Task } from '@/types/task';

@Component({
	selector: 'app-dash-tasks-list',
	imports: [CheckboxModule, AvatarGroupModule, AvatarModule, ButtonModule, RippleModule, FormsModule, MenuModule, CommonModule],
	templateUrl: './dash-tasks-list.component.html',
	styleUrl: './dash-tasks-list.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashTasksListComponent {
    @Input() taskList!: Task[];

	@Input() title!: string;

	@ViewChild('menu') menu!: Menu;

	menuItems: MenuItem[] = [];

	clickedTask!: Task;

	constructor(private taskService: TaskService) {}

	ngOnInit(): void {
		this.menuItems = [
			{
				label: 'Edit',
				icon: 'pi pi-pencil',
				command: () => this.onEdit()
			},
			{
				label: 'Delete',
				icon: 'pi pi-trash',
				command: () => this.handleDelete()
			}
		];
	}

	parseDate(date: Date) {
		let d = new Date(date);
		return d.toUTCString().split(' ').slice(1, 3).join(' ');
	}

	handleDelete() {
		this.taskService.removeTask(this.clickedTask.id);
	}

	toggleMenu(event: Event, task: Task) {
		this.clickedTask = task;
		this.menu.toggle(event);
	}

	onEdit() {
		this.taskService.onTaskSelect(this.clickedTask);
		this.taskService.showDialog('Edit Task', false);
	}

	onCheckboxChange(event: any, task: Task) {
		event.originalEvent.stopPropagation();
		task.completed = event.checked;
		this.taskService.markAsCompleted(task);
	}
}
