import { TaskTypeRepo, TaskTypeRepoCreate, TaskTypeRepoSimple } from '@/core/interfaces/repo/repo-tasktype.interface';
import { RepoTaskTypeService } from '@/core/services/repo/repo-tasktype.service';
import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ButtonModule } from 'primeng/button';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { DialogModule } from 'primeng/dialog';
import { EditorModule } from 'primeng/editor';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputNumberModule } from 'primeng/inputnumber';
import { InputTextModule } from 'primeng/inputtext';
import { RadioButtonModule } from 'primeng/radiobutton';
import { RatingModule } from 'primeng/rating';
import { RippleModule } from 'primeng/ripple';
import { SelectModule } from 'primeng/select';
import { SkeletonModule } from 'primeng/skeleton';
import { Table, TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { TextareaModule } from 'primeng/textarea';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';

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
  selector: 'app-repo-tasktypes',
  imports: [
	CommonModule,
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
    EditorModule
  ],
  templateUrl: './repo-tasktypes.component.html',
  styleUrl: './repo-tasktypes.component.scss',
  providers: [MessageService, ConfirmationService]
})
export class RepoTasktypesComponent {
	repoTaskTypeService = inject(RepoTaskTypeService)

    filterColFields: string[] = ['id', 'name', 'description'];
	taskTypeDialog: boolean = false;
	taskType!: TaskTypeRepoSimple;

	taskTypeSubmitted: boolean = false;

	@ViewChild('ph') ph!: Table;

    exportColumns!: ExportColumn[];

    cols!: Column[];

    constructor(
        private messageService: MessageService,
        private confirmationService: ConfirmationService
    ) {}

    exportCSV() {
        this.ph.exportCSV();
    }

    onGlobalFilter(table: Table, event: Event) {
        table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
    }

    openNew() {
		this.taskType = {id: 0, name: ''};
		this.taskTypeSubmitted = false;
		this.taskTypeDialog = true;
    }

	editTaskType(taskType: TaskTypeRepo) {
		this.taskType = { ...taskType };
		this.repoTaskTypeService.selectedTaskType.set(taskType);
		this.taskTypeDialog = true;
	}

    deleteSelectedTaskTypes(id: number) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete the selected taskTypes?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.repoTaskTypeService.selectedTaskTypes.set(this.repoTaskTypeService.selectedTaskTypes().filter((val) => !this.repoTaskTypeService.selectedTaskTypes().includes(val)));
                this.repoTaskTypeService.deleteTaskType(id);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'TaskTypes Deleted',
                    life: 3000
                });
            }
        });
    }

    hideDialog() {
        this.taskTypeDialog = false;
		this.taskTypeSubmitted = false;
    }

	findTaskTypeIndexById(id: number): number {
        let index = -1;
        for (let i = 0; i < this.repoTaskTypeService.allTaskTypes().length; i++) {
            if (this.repoTaskTypeService.allTaskTypes()[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

	createTaskTypeId(taskType: TaskTypeRepoCreate) {
		this.repoTaskTypeService.createTaskType(taskType);
	}

	/**
	 * Save the currently edited TaskType. If the TaskType has an id, it is updated,
	 * otherwise it is created. The taskTypeDialog is then closed and the taskType
	 * is reset to its default state.
	 */
	saveTaskType() {
		this.taskTypeSubmitted = true;
		let _taskTypes = this.repoTaskTypeService.allTaskTypes();
		if (this.taskType.name?.trim()) {
			if (this.taskType.id) {
                console.log(this.taskType);
				_taskTypes[this.findTaskTypeIndexById(this.taskType.id)] = this.taskType;
				this.repoTaskTypeService.selectedTaskTypes.set([..._taskTypes]);
                this.repoTaskTypeService.editTaskType(this.taskType.id, this.taskType)
				this.messageService.add({
					severity: 'success',
					summary: 'Successful',
					detail: 'TaskType Updated',
					life: 3000
				});
            }
            else {
				this.messageService.add({
					severity: 'success',
					summary: 'Successful',
					detail: 'TaskType Created',
					life: 3000
				});
				this.repoTaskTypeService.createTaskType(this.taskType);
			}

			this.taskTypeDialog = false;
			this.taskType = {
				id: 0,
				name: '',
			};
        }
	}
}
