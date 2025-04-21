import { Component, inject, OnInit, AfterViewInit, TemplateRef, ViewChild, effect } from '@angular/core';
import { LucideAngularModule, Plus, Upload, Search, Pencil, Trash2, X, Check, AlertTriangle, FileText, Save } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule, SelectionType } from '@swimlane/ngx-datatable';
import { RepoCategoryService } from '../../../core/services/repo/repo-category.service';
import { NotebookRepo } from '../../../core/interfaces/repo/repo-notebook.interface';
import { CategoryRepo } from '../../../core/interfaces/repo/repo-category.interface';

// Import for vanilla Bootstrap modal
declare var bootstrap: any;
@Component({
  selector: 'app-repo-task-categories',
  imports: [CommonModule, LucideAngularModule, FormsModule, NgxDatatableModule],
  templateUrl: './repo-task-categories.component.html',
  styleUrl: './repo-task-categories.component.scss'
})
export class RepoTaskCategoriesComponent {
  // Inject services
  repoTaskCategoryService = inject(RepoCategoryService);
  
  // Define Lucide icons
  Plus = Plus;
  Upload = Upload;
  Search = Search;
  Pencil = Pencil;
  Trash2 = Trash2;
  X = X;
  Check = Check;
  AlertTriangle = AlertTriangle;
  FileText = FileText;
  Save = Save;

  // Force the service to load notebooks initially
  constructor() {
    // This will trigger loading notebooks from the API
    this.repoTaskCategoryService.getAllCategoriesResource.reload();
    
    // Create an effect to automatically update the _notebooks array when allNotebooks() changes
    effect(() => {
      this._taskCategories = this.repoTaskCategoryService.allCategories();
      console.log('Effect triggered: taskCategories updated', this._taskCategories);
    });
  }

  get taskCategories(): CategoryRepo[] {
    return this._taskCategories;
  }

  set taskCategories(value: CategoryRepo[]) {
    this._taskCategories = value;
  }

  private _taskCategories: CategoryRepo[] = [];
  
  taskCategory: CategoryRepo = {
    id: 0,
    name: '',
    description: '',
  };
  selected: CategoryRepo[] = [];

  private taskCategoryModal: any;
  private confirmModal: any;
  private deleteId: number | null = null;
  private temp: CategoryRepo[] = [];
  SelectionType = SelectionType;

  ngOnInit(): void {
    // Force reload data
    this.repoTaskCategoryService.getAllCategoriesResource.reload();
  
  }

  // Load task categories from service
  loadTaskCategories(): void {
    // This triggers a reload of the task categories
    this.repoTaskCategoryService.getAllCategoriesResource.reload();
    console.log('Loading taskCategories, current value:', this.repoTaskCategoryService.allCategories());
  }

  ngAfterViewInit(): void {
    // Initialize Bootstrap modals after view is initialized
    setTimeout(() => {
      const taskCategoryModalElement = document.getElementById('taskCategoryModal');
      const confirmModalElement = document.getElementById('confirmModal');
      
      if (taskCategoryModalElement) {
        this.taskCategoryModal = new bootstrap.Modal(taskCategoryModalElement);
      } else {
        console.error('taskCategoryModal element not found');
      }
      
      if (confirmModalElement) {
        this.confirmModal = new bootstrap.Modal(confirmModalElement);
      } else {
        console.error('confirmModal element not found');
      }
    }, 100);
  }
  
  // For search filtering
  updateFilter(event: any): void {
    const val = event.target.value.toLowerCase();
    
    // Always start with fresh data from the service
    if (!val) {
      this.loadTaskCategories();
      return;
    }
    
    // Filter the data from the full dataset
    this._taskCategories = this.repoTaskCategoryService.allCategories().filter(taskCategory => 
      taskCategory.name.toLowerCase().includes(val) ||
      taskCategory.description.toLowerCase().includes(val) ||
      taskCategory.id.toString().includes(val)
    );
  }
  
  // Selection handling
  onSelect({ selected }: { selected: CategoryRepo[] }): void {
    this.selected = selected;
    this.repoTaskCategoryService.selectedCategories.set(selected);
  }
  
  openNew(): void {
    this.loadTaskCategories();  // Reset data
    this.initTaskCategory();  // Initialize with empty values
    this.taskCategoryModal.show();
  }

  findTaskCategoryIndexById(id: number): number {
    let index = -1;
    for (let i = 0; i < this.repoTaskCategoryService.allCategories().length; i++) {
        if (this.repoTaskCategoryService.allCategories()[i].id === id) {
            index = i;
            break;
        }
    }

    return index;
  }
  
  // Initialize task category with empty values
  initTaskCategory(): void {
    this.taskCategory = {
      id: 0,
      name: '',
      description: '',
    };
    this.taskCategoryModal.show();
  }
  
  editTaskCategory(taskCategory: CategoryRepo): void {
    console.log('Editing task category:', taskCategory);
    
    this.taskCategory = { ...taskCategory };
		this.repoTaskCategoryService.selectedCategory.set(taskCategory);
    
    // Check if the modal is initialized
    if (!this.taskCategoryModal) {
      console.error('Modal not initialized!');
      // Initialize again if needed
      setTimeout(() => {
        const taskCategoryModalElement = document.getElementById('taskCategoryModal');
        if (taskCategoryModalElement) {
          this.taskCategoryModal = new bootstrap.Modal(taskCategoryModalElement);
          this.taskCategoryModal.show();
        }
      }, 100);
    } else {
      this.taskCategoryModal.show();
    }
  }
  
  hideDialog(): void {
    this.taskCategoryModal.hide();
  }
  
  deleteSelectedTaskCategories(id: number): void {
    this.deleteId = id;
    this.confirmModal.show();
  }
  
  dismissConfirm(): void {
    this.confirmModal.hide();
    this.deleteId = null;
  }
  
  confirmDelete(): void {
    if (this.deleteId) {
      this.repoTaskCategoryService.deleteCategory(this.deleteId);
      this.loadTaskCategories();  // Reload after delete
    }
    this.dismissConfirm();
  }
  
  saveTaskCategory(): void {
    this.repoTaskCategoryService.selectedCategory.set(this.taskCategory);
    console.log("saving task category", this.taskCategory);
    if (this.taskCategory.id) {
      this.repoTaskCategoryService.editCategory(this.taskCategory.id, this.repoTaskCategoryService.selectedCategory());
    } else {
      this.repoTaskCategoryService.createCategory(this.taskCategory);
    }
    
        this.taskCategory = {
          id: 0,
          name: '',
          description: '',
        };
    this.loadTaskCategories();  // Reload after save
    this.hideDialog();
  }
  
  // Reset filter and show all data
  resetFilter(): void {
    this.loadTaskCategories();
  }
  
  exportCSV(): void {
    // Implementation in the future, need to find a proper library
  }
  
}
