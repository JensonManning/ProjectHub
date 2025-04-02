import { NotebookRepo } from '@/core/interfaces/repo/repo-notebook.interface';
import { RepoNotebookService } from '@/core/services/repo/repo-notebook.service';
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
  selector: 'app-repo-notebooks',
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
  templateUrl: './repo-notebooks.component.html',
  styleUrl: './repo-notebooks.component.scss',
  providers: [MessageService, ConfirmationService]
})
export class RepoNotebooksComponent {
    repoNotebookService = inject(RepoNotebookService)

    filterColFields: string[] = ['id', 'name', 'description'];
	notebookDialog: boolean = false;
	notebook!: NotebookRepo;

	notebookSubmitted: boolean = false;

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
		this.notebook = {id: 0, name: '', description: '', content: ''};
		this.notebookSubmitted = false;
		this.notebookDialog = true;
    }

	editNotebook(notebook: NotebookRepo) {
		this.notebook = { ...notebook };
		this.repoNotebookService.selectedNotebook.set(notebook);
		this.notebookDialog = true;
	}

    deleteSelectedNotebooks(id: number) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete the selected notebooks?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.repoNotebookService.selectedNotebooks.set(this.repoNotebookService.selectedNotebooks().filter((val) => !this.repoNotebookService.selectedNotebooks().includes(val)));
                this.repoNotebookService.deleteNotebook(id);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Notebooks Deleted',
                    life: 3000
                });
            }
        });
    }

    hideDialog() {
        this.notebookDialog = false;
		this.notebookSubmitted = false;
    }

	findNotebookIndexById(id: number): number {
        let index = -1;
        for (let i = 0; i < this.repoNotebookService.allNotebooks().length; i++) {
            if (this.repoNotebookService.allNotebooks()[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

	createNotebookId(notebook: NotebookRepo) {
		this.repoNotebookService.createNotebook(notebook);
	}

    getSeverity(status: string) {
        switch (status) {
            case 'INSTOCK':
                return 'success';
            case 'LOWSTOCK':
                return 'warn';
            case 'OUTOFSTOCK':
                return 'danger';
            default:
                return 'info';
        }
    }

	saveNotebook() {
		this.notebookSubmitted = true;
		let _notebooks = this.repoNotebookService.allNotebooks();
		if (this.notebook.name?.trim()) {
			if (this.notebook.id) {
                console.log(this.notebook);
				_notebooks[this.findNotebookIndexById(this.notebook.id)] = this.notebook;
				this.repoNotebookService.selectedNotebooks.set([..._notebooks]);
                this.repoNotebookService.editNotebook(this.notebook.id, this.notebook)
				this.messageService.add({
					severity: 'success',
					summary: 'Successful',
					detail: 'Notebook Updated',
					life: 3000
				});
            }
            else {
				this.messageService.add({
					severity: 'success',
					summary: 'Successful',
					detail: 'Notebook Created',
					life: 3000
				});
				this.repoNotebookService.createNotebook(this.notebook);
			}

			this.notebookDialog = false;
			this.notebook = {
				id: 0,
				name: '',
				description: '',
				content: ''
			};
        }
	}
}
