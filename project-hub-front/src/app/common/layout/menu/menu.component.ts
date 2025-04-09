import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MenuItemComponent } from '../menu-item/menu-item.component';

@Component({
  selector: '[app-menu]',
  imports: [CommonModule, MenuItemComponent],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss'
})
export class MenuComponent {
    model: any[] = [
		{
			label: 'Dashboards',
			icon: 'pi pi-home',
			items: [
				{
					label: 'App Admin',
					icon: 'pi pi-code',
					routerLink: ['/']
				},
				{
					label: 'Kanban',
					icon: 'pi pi-database',
					routerLink: ['/apps/kanban']
				}
			]
		},
		{ separator: true },
		{
		label: 'Projects',
		icon: 'pi pi-bolt',
		items: [
			{
				label: 'Manage',
				icon: 'pi pi-list',
				routerLink: ['/projects/manage']
			},
			{
				label: 'Create',
				icon: 'pi pi-plus',
				routerLink: ['/projects/create']
			},

			{
				label: 'Analytics',
				icon: 'pi pi-chart-scatter',
				routerLink: ['/projects/analytics']
			}
		]
		},
		{ separator: true },
		{
			label: 'Users',
			icon: 'pi pi-users',
			items: [
				{
					label: 'Manage Users',
					icon: 'pi pi-user-edit',
					routerLink: ['/users/manage']
				},
				{
					label: 'Manage Roles',
					icon: 'pi pi-sliders-h',
					routerLink: ['/users/roles/manage']
				}
			]
		},
		{ separator: true },
		{
		label: 'Repo',
		icon: 'pi pi-database',
		items: [
			{
				label: 'Phases',
				icon: 'pi pi-sort-numeric-down',
				routerLink: ['/repo/phases']
			},
			{
				label: 'Tasks',
				icon: 'pi pi-list-check',
				routerLink: ['/repo/tasks']
			},
			{
				label: 'Task Types',
				icon: 'pi pi-key',
				routerLink: ['/repo/tasktypes']
			},
			{
				label: 'Category',
				icon: 'pi pi-tag',
				routerLink: ['/repo/category']
			},
			{
				label: 'Resources',
				icon: 'pi pi-users',
				routerLink: ['/repo/resources']
			},
			{
				label: 'Notebooks',
				icon: 'pi pi-book',
				routerLink: ['/repo/notebooks']
			}
		]
		},
		
	];
}
