import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MessageService, ConfirmationService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { SelectModule } from 'primeng/select';
import { Table, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { TextareaModule } from 'primeng/textarea';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { SkeletonModule } from 'primeng/skeleton';
import { TaskRepo, TaskRepoCreate, TaskRepoUpdate } from '@/core/interfaces/repo/repo-task.interface';
import { SubTaskRepo } from '@/core/interfaces/repo/repo-subtask.interface';
import { RepoTaskService } from '@/core/services/repo/repo-task.service';
import { DrawerModule } from 'primeng/drawer';
import { RepoCategoryService } from '@/core/services/repo/repo-category.service';
import { RepoResourceService } from '@/core/services/repo/repo-resource.service';
import { FluidModule } from 'primeng/fluid';
import { MultiSelectModule } from 'primeng/multiselect';
import { RepoTaskTypeService } from '@/core/services/repo/repo-tasktype.service';
import { forkJoin } from 'rxjs';

interface Column {
	field: string;
	header: string;
	customExportHeader?: string;
}

interface ExportColumn {
	title: string;
	dataKey: string;
}

@Component({
	selector: 'app-repo-tasks',
	imports: [CommonModule,
		TableModule,
		FormsModule,
		ButtonModule,
		RippleModule,
		ToastModule,
		ToolbarModule,
		RatingModule,
		InputTextModule,
		TextareaModule,
		SelectModule,
		RadioButtonModule,
		InputNumberModule,
		DialogModule,
		TagModule,
		InputIconModule,
		IconFieldModule,
		ConfirmDialogModule,
		SkeletonModule,
		DrawerModule,
		FluidModule,
		MultiSelectModule],
	templateUrl: './repo-tasks.component.html',
	styleUrls: ['./repo-tasks.component.scss'],
	providers: [MessageService, ConfirmationService]
})
export class RepoTasksComponent {
	repoTaskService = inject(RepoTaskService)
	repoCategoryService = inject(RepoCategoryService)
	repoResourceService = inject(RepoResourceService)
    repoTaskTypeService = inject(RepoTaskTypeService)
    filterColFields: string[] = ['id', 'name', 'description', 'order', 'categoryRepo.name', 'hasSubTaskRepo', 'taskTypeRepo.name'];
	tasksDialog: boolean = false;
	tasksCreateDialog: boolean = false;
	tasks!: TaskRepo;
	tasksCreate!: TaskRepoCreate;
	tasksUpdate!: TaskRepoUpdate;
	selectedResources: number[] = [];
	tasksSubmitted: boolean = false;
    subTaskVisible: boolean = false;
    
    // For managing subtasks in the create form
    newSubTask: { name: string; description: string } = { name: '', description: '' };
    subtasks: { name: string; description: string }[] = [];
    
    // All available resources for selection
    availableResources: any[] = [
        { id: 1, name: 'Resource 1' },
        { id: 2, name: 'Resource 2' },
        { id: 3, name: 'Resource 3' },
        { id: 4, name: 'Resource 4' },
        { id: 5, name: 'Resource 5' }
    ];

    @ViewChild('dt') dt!: Table;
	@ViewChild('ph') ph!: Table;

    exportColumns!: ExportColumn[];

    cols!: Column[];

    constructor(
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    exportCSV() {
        this.dt.exportCSV();
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

	addResource(resourceId: number) {
		const resource = this.repoResourceService.allResources().find(r => r.id === resourceId);
		if (resource) {
			this.tasks.taskRepoResources.push({
				resourceRepo: {
					id: resource.id,
					name: resource.name
				}
			});
		}
	}

    openNew() {
		this.tasks = {
			id: 0, name: '', description: '', phaseOrder: 0, hasSubTaskRepo: false, 
			categoryRepoId: 0, 
			taskTypeRepoId: 0,
			taskTypeRepo: {
				id: 0,
				name: '',
			},
			categoryRepo: {
				id: 0,
				name: '',
			}, 
			taskRepoResources: [],
			subTaskRepo: []
		};
		this.tasksSubmitted = false;
		this.tasksDialog = true;
    }

	openNewCreate() {
		this.tasksCreate = {
			name: '',
			description: '',
			phaseOrder: 0,
			taskTypeRepoId: 0,
			hasSubTaskRepo: false,
			categoryRepoId: 0,
			resourceIds: []
		};
		this.tasksSubmitted = false;
		this.tasksCreateDialog = true;
        // Reset subtasks array when opening a new create form
        this.subtasks = [];
	}

    hideDialog() {
        this.tasksDialog = false;
        this.tasksCreateDialog = false;
		this.tasksSubmitted = false;
    }

    // Add a new subtask to the subtasks array
    addSubTask() {
        if (this.newSubTask.name.trim()) {
            this.subtasks.push({...this.newSubTask});
            // Reset the new subtask form
            this.newSubTask = { name: '', description: '' };
        }
    }

    // Remove a subtask from the subtasks array
    removeSubTask(index: number) {
        this.subtasks.splice(index, 1);
    }

	editTask(tasks: TaskRepo) {
		this.tasks = { ...tasks };
		this.tasks.taskTypeRepoId = tasks.taskTypeRepo?.id || 0;  // Set the taskTypeRepoId from taskTypeRepo
		this.repoTaskService.selectedTask.set(tasks);
		this.selectedResources = tasks.taskRepoResources.map(r => r.resourceRepo.id);
		this.tasksDialog = true;
	}

    deleteSelectedTasks(id: number) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete the selected taskss?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.repoTaskService.selectedTasks.set(this.repoTaskService.selectedTasks().filter((val) => !this.repoTaskService.selectedTasks().includes(val)));
                this.repoTaskService.deleteTask(id);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Tasks Deleted',
                    life: 3000
                });
            }
        });
    }

    findTaskIndexById(id: number): number {
        let index = -1;
        for (let i = 0; i < this.repoTaskService.allTasks().length; i++) {
            if (this.repoTaskService.allTasks()[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    getResourceNames(resources: any[]): string {
        if (!resources || resources.length === 0) {
            return '';
        }
        return resources.map(resource => resource.name || resource).join(', ');
    }

	saveTask() {
		this.tasksSubmitted = true;
		
		// Handle new task creation
		if (this.tasksCreate?.name?.trim()) {
            // Create a copy of the task data to submit
            const taskToCreate = {...this.tasksCreate};
            
            this.repoTaskService.createTask(taskToCreate).subscribe({
				next: (createdTask: TaskRepo) => {
                    // If the task has subtasks and subtasks were added, create them
                    if (taskToCreate.hasSubTaskRepo && this.subtasks.length > 0) {
                        try {
                            // Create an array to store all subtask creation promises
                            const subtaskPromises = this.subtasks.map(subtask => {
                                const newSubTask: SubTaskRepo = {
                                    id: 0, // Will be assigned by the server
                                    name: subtask.name,
                                    description: subtask.description,
                                    taskRepoId: createdTask.id // Use the ID of the newly created task
                                };
                                
                                // Return the observable for each subtask creation
                                return this.repoTaskService.createSubTask(newSubTask);
                            });
                            
                            // Use forkJoin to wait for all subtask creations to complete
                            forkJoin(subtaskPromises).subscribe({
                                next: () => {
                                    this.messageService.add({
                                        severity: 'success',
                                        summary: 'Successful',
                                        detail: 'Task and Subtasks Created',
                                        life: 3000
                                    });
                                    this.tasksCreateDialog = false;
                                    this.repoTaskService.getAllTasksResource.reload();
                                },
                                error: (err) => {
                                    this.messageService.add({
                                        severity: 'warn',
                                        summary: 'Warning',
                                        detail: `Task created but some subtasks failed: ${err.message}`,
                                        life: 5000
                                    });
                                    console.error('Error creating subtasks:', err);
                                    this.tasksCreateDialog = false;
                                    this.repoTaskService.getAllTasksResource.reload();
                                }
                            });
                        } catch (error) {
                            console.error('Error setting up subtask creation:', error);
                            this.messageService.add({
                                severity: 'success',
                                summary: 'Partial Success',
                                detail: 'Task created but failed to set up subtasks',
                                life: 3000
                            });
                            this.tasksCreateDialog = false;
                            this.repoTaskService.getAllTasksResource.reload();
                        }
                    } else {
                        this.messageService.add({
                            severity: 'success',
                            summary: 'Successful',
                            detail: 'Task Created',
                            life: 3000
                        });
                        this.tasksCreateDialog = false;
                        this.repoTaskService.getAllTasksResource.reload();
                    }
				},
				error: (err) => {
					this.messageService.add({
						severity: 'error',
						summary: 'Error',
						detail: `Failed to create task: ${err.message}`,
						life: 5000
					});
					console.error('Task creation error:', err);
				}
			});
		}
		// Handle existing task update
		else if (this.tasks?.name?.trim()) {
			let _tasks = this.repoTaskService.allTasks();
			if (this.tasks.id) {
				const updateData: TaskRepoUpdate = {
					...this.tasks,
					resourceIds: this.selectedResources,
					taskTypeRepoId: this.tasks.taskTypeRepoId
				};

				this.repoTaskService.editTask(this.tasks.id, updateData).subscribe({
					next: () => {
						this.messageService.add({
							severity: 'success',
							summary: 'Successful',
							detail: 'Task Updated',
							life: 3000
						});
						// Update the local array only after successful update
						_tasks[this.findTaskIndexById(this.tasks.id)] = this.tasks;
						this.repoTaskService.selectedTasks.set([..._tasks]);
						this.tasksDialog = false;
						this.repoTaskService.getAllTasksResource.reload();
						
						// Reset the task data after dialog is closed
						this.tasks = {
							id: 0, 
							name: '', 
							description: '', 
							phaseOrder: 0, 
							hasSubTaskRepo: false, 
							categoryRepoId: 0,
							taskTypeRepoId: 0,
							categoryRepo: {
								id: 0,
								name: '',
							},
							taskTypeRepo: {
								id: 0,
								name: '',
							},
							taskRepoResources: [],
							subTaskRepo: []
						};
					},
					error: (err) => {
						this.messageService.add({
							severity: 'error',
							summary: 'Error',
							detail: 'Failed to update task',
							life: 3000
						});
						console.error(err);
					}
				});
			}
		}
	}
}
