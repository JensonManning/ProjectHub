import { ResourceRepo, ResourceRepoNoTasks } from '@/core/interfaces/repo/repo-resource.interface';
import { RepoResourceService } from '@/core/services/repo/repo-resource.service';
import { Component, inject, ViewChild } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { RatingModule } from 'primeng/rating';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { SelectModule } from 'primeng/select';
import { RadioButtonModule } from 'primeng/radiobutton';
import { InputNumberModule } from 'primeng/inputnumber';
import { DialogModule } from 'primeng/dialog';
import { TagModule } from 'primeng/tag';
import { InputIconModule } from 'primeng/inputicon';
import { IconFieldModule } from 'primeng/iconfield';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { SkeletonModule } from 'primeng/skeleton';

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
	selector: 'app-repo-resources',
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
		SkeletonModule],
	templateUrl: './repo-resources.component.html',
	styleUrl: './repo-resources.component.scss',
	providers: [MessageService, ConfirmationService]
})
export class RepoResourcesComponent {
	repoResourceService = inject(RepoResourceService)

	filterColFields: string[] = ['id', 'name'];
	resourceDialog: boolean = false;
	resource!: ResourceRepoNoTasks;

	resourceSubmitted: boolean = false;

	@ViewChild('dt') dt!: Table;
	@ViewChild('ph') ph!: Table;

	exportColumns!: ExportColumn[];
	cols!: Column[];

	constructor(
		private messageService: MessageService,
		private confirmationService: ConfirmationService
	) {
		
	}

	exportCSV() {
		this.dt.exportCSV();
	}

	onGlobalFilter(table: Table, event: Event) {
		table.filterGlobal((event.target as HTMLInputElement).value, 'contains');
	}

	openNew() {
		this.resource = {id: 0, name: ''};
		this.resourceSubmitted = false;
		this.resourceDialog = true;
	}

	editResource(resource: ResourceRepo) {
		this.resource = { ...resource };
		this.repoResourceService.selectedResource.set(resource);
		this.resourceDialog = true;
	}

    deleteSelectedResources(id: number) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete the selected Resources?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.repoResourceService.selectedResources.set(this.repoResourceService.selectedResources().filter((val) => !this.repoResourceService.selectedResources().includes(val)));
                this.repoResourceService.deleteResource(id);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Resources Deleted',
                    life: 3000
                });
            }
        });
    }

    hideDialog() {
        this.resourceDialog = false;
		this.resourceSubmitted = false;
    }

	findResourceIndexById(id: number): number {
        let index = -1;
        for (let i = 0; i < this.repoResourceService.allResources().length; i++) {
            if (this.repoResourceService.allResources()[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

    createId(): string {
        let id = '';
        var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        for (var i = 0; i < 5; i++) {
            id += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        return id;
    }

	createResourceId(resource: ResourceRepo) {
		this.repoResourceService.createResource(resource);
	}

	saveResource() {
		this.resourceSubmitted = true;
		let _Resources = this.repoResourceService.allResources();
		if (this.resource.name?.trim()) {
			if (this.resource.id) {
                console.log(this.resource);
				_Resources[this.findResourceIndexById(this.resource.id)] = this.resource;
				this.repoResourceService.selectedResources.set([..._Resources]);
                this.repoResourceService.editResource(this.resource.id, this.resource)
				this.messageService.add({
					severity: 'success',
					summary: 'Successful',
					detail: 'Resource Updated',
					life: 3000
				});
            }
            else {
				this.messageService.add({
					severity: 'success',
					summary: 'Successful',
					detail: 'Resource Created',
					life: 3000
				});
				this.repoResourceService.createResource(this.resource);
			}

			this.resourceDialog = false;
			this.resource = {
				id: 0,
				name: '',
			};
        }
	}
}
