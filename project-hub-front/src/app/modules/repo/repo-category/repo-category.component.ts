import { CategoryRepo } from '@/core/interfaces/repo/repo-category.interface';
import { RepoCategoryService } from '@/core/services/repo/repo-category.service';
import { Component, inject, ViewChild } from '@angular/core';
import { MessageService, ConfirmationService } from 'primeng/api';
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
  selector: 'app-repo-category',
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
    SkeletonModule
  ],
  templateUrl: './repo-category.component.html',
  styleUrl: './repo-category.component.scss',
  providers: [MessageService, ConfirmationService]
})
export class RepoCategoryComponent {
	repoCategoryService = inject(RepoCategoryService)

    filterColFields: string[] = ['id', 'name', 'description'];
	categoryDialog: boolean = false;
	category!: CategoryRepo;

	categorySubmitted: boolean = false;

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
		this.category = {id: 0, name: '', description: ''};
		this.categorySubmitted = false;
		this.categoryDialog = true;
    }

	editCategory(category: CategoryRepo) {
		this.category = { ...category };
		this.repoCategoryService.selectedCategory.set(category);
		this.categoryDialog = true;
	}

    deleteSelectedCategories(id: number) {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete the selected categories?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.repoCategoryService.selectedCategories.set(this.repoCategoryService.selectedCategories().filter((val) => !this.repoCategoryService.selectedCategories().includes(val)));
                this.repoCategoryService.deleteCategory(id);
                this.messageService.add({
                    severity: 'success',
                    summary: 'Successful',
                    detail: 'Categories Deleted',
                    life: 3000
                });
            }
        });
    }

    hideDialog() {
        this.categoryDialog = false;
		this.categorySubmitted = false;
    }

	findCategoryIndexById(id: number): number {
        let index = -1;
        for (let i = 0; i < this.repoCategoryService.allCategories().length; i++) {
            if (this.repoCategoryService.allCategories()[i].id === id) {
                index = i;
                break;
            }
        }

        return index;
    }

	createCategoryId(category: CategoryRepo) {
		this.repoCategoryService.createCategory(category);
	}

	saveCategory() {
		this.categorySubmitted = true;
		let _categorys = this.repoCategoryService.allCategories();
		if (this.category.name?.trim()) {
			if (this.category.id) {
                console.log(this.category);
				_categorys[this.findCategoryIndexById(this.category.id)] = this.category;
				this.repoCategoryService.selectedCategories.set([..._categorys]);
                this.repoCategoryService.editCategory(this.category.id, this.category)
				this.messageService.add({
					severity: 'success',
					summary: 'Successful',
					detail: 'Category Updated',
					life: 3000
				});
            }
            else {
				this.messageService.add({
					severity: 'success',
					summary: 'Successful',
					detail: 'Category Created',
					life: 3000
				});
				this.repoCategoryService.createCategory(this.category);
			}

			this.categoryDialog = false;
			this.category = {
				id: 0,
				name: '',
				description: '',
			};
        }
	}
}
