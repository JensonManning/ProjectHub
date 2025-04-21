import { Component, inject, effect } from '@angular/core';
import { LucideAngularModule, Plus, Upload, Search, Pencil, Trash2, X, Check, AlertTriangle, FileText, Save } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule, SelectionType } from '@swimlane/ngx-datatable';
import { RepoTaskTypeService } from '../../../core/services/repo/repo-tasktype.service';
import { TaskTypeRepoSimple } from '../../../core/interfaces/repo/repo-tasktype.interface';

// Import for vanilla Bootstrap modal
declare var bootstrap: any;

@Component({
  selector: 'app-repo-task-types',
  imports: [CommonModule, LucideAngularModule, FormsModule, NgxDatatableModule],
  templateUrl: './repo-task-types.component.html',
  styleUrl: './repo-task-types.component.scss'
})
export class RepoTaskTypesComponent {
  // Inject services
  repoTaskTypeService = inject(RepoTaskTypeService);
  
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
    this.repoTaskTypeService.getAllTaskTypesResource.reload();
    
    // Create an effect to automatically update the _notebooks array when allNotebooks() changes
    effect(() => {
      this._taskTypes = this.repoTaskTypeService.allTaskTypes();
      console.log('Effect triggered: taskTypes updated', this._taskTypes);
    });
  }

  get taskTypes(): TaskTypeRepoSimple[] {
    return this._taskTypes;
  }

  set taskTypes(value: TaskTypeRepoSimple[]) {
    this._taskTypes = value;
  }

  private _taskTypes: TaskTypeRepoSimple[] = [];
  
  taskType: TaskTypeRepoSimple = {
    id: 0,
    name: '',
  };
  selected: TaskTypeRepoSimple[] = [];

  private taskTypeModal: any;
  private confirmModal: any;
  private deleteId: number | null = null;
  private temp: TaskTypeRepoSimple[] = [];
  SelectionType = SelectionType;

  ngOnInit(): void {
    // Force reload data
    this.repoTaskTypeService.getAllTaskTypesResource.reload();
  }

  // Load task types from service
  loadTaskTypes(): void {
    // This triggers a reload of the task types
    this.repoTaskTypeService.getAllTaskTypesResource.reload();
    console.log('Loading task types, current value:', this.repoTaskTypeService.allTaskTypes());
  }

  ngAfterViewInit(): void {
    // Initialize Bootstrap modals after view is initialized
    setTimeout(() => {
      const taskTypeModalElement = document.getElementById('taskTypeModal');
      const confirmModalElement = document.getElementById('confirmModal');
      
      if (taskTypeModalElement) {
        this.taskTypeModal = new bootstrap.Modal(taskTypeModalElement);
      } else {
        console.error('taskTypeModal element not found');
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
      this.loadTaskTypes();
      return;
    }
    
    // Filter the data from the full dataset
    this._taskTypes = this.repoTaskTypeService.allTaskTypes().filter(taskType => 
      taskType.name.toLowerCase().includes(val) ||
      taskType.id.toString().includes(val)
    );
  }
  
  // Selection handling
  onSelect({ selected }: { selected: TaskTypeRepoSimple[] }): void {
    this.selected = selected;
    this.repoTaskTypeService.selectedTaskTypes.set(selected);
  }
  
  openNew(): void {
    this.loadTaskTypes();  // Reset data
    this.initTaskType();  // Initialize with empty values
    this.taskTypeModal.show();
  }
  
  // Initialize task type with empty values
  initTaskType(): void {
    this.taskType = {
      id: 0,
      name: '',
    };
    this.taskTypeModal.show();
  }
  
  editTaskType(taskType: TaskTypeRepoSimple): void {
    console.log('Editing task type:', taskType);
    
    this.taskType = { ...taskType };
		this.repoTaskTypeService.selectedTaskType.set(taskType);
    
    // Check if the modal is initialized
    if (!this.taskTypeModal) {
      console.error('Modal not initialized!');
      // Initialize again if needed
      setTimeout(() => {
        const taskTypeModalElement = document.getElementById('taskTypeModal');
        if (taskTypeModalElement) {
          this.taskTypeModal = new bootstrap.Modal(taskTypeModalElement);
          this.taskTypeModal.show();
        }
      }, 100);
    } else {
      this.taskTypeModal.show();
    }
  }
  
  hideDialog(): void {
    this.taskTypeModal.hide();
  }
  
  deleteSelectedTaskTypes(id: number): void {
    this.deleteId = id;
    this.confirmModal.show();
  }
  
  dismissConfirm(): void {
    this.confirmModal.hide();
    this.deleteId = null;
  }
  
  confirmDelete(): void {
    if (this.deleteId) {
      this.repoTaskTypeService.deleteTaskType(this.deleteId);
      this.loadTaskTypes();  // Reload after delete
    }
    this.dismissConfirm();
  }
  
  saveTaskType(): void {
    this.repoTaskTypeService.selectedTaskType.set(this.taskType);
    console.log("saving task type", this.taskType);
    if (this.taskType.id) {
      this.repoTaskTypeService.editTaskType(this.taskType.id, this.repoTaskTypeService.selectedTaskType());
    } else {
      this.repoTaskTypeService.createTaskType(this.taskType);
    }
    
        this.taskType = {
          id: 0,
          name: '',
        };
    this.loadTaskTypes();  // Reload after save
    this.hideDialog();
  }
  
  // Reset filter and show all data
  resetFilter(): void {
    this.loadTaskTypes();
  }
  
  exportCSV(): void {
    // Implementation in the future, need to find a proper library
  }
  
}
