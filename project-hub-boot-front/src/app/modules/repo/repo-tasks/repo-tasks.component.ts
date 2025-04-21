import { Component, effect, inject } from '@angular/core';
import { LucideAngularModule, Plus, Upload, Search, Pencil, Trash2, X, Check, AlertTriangle, FileText, Save, ChevronDown } from 'lucide-angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgxDatatableModule, SelectionType } from '@swimlane/ngx-datatable';
import { RepoTaskService } from '../../../core/services/repo/repo-task.service';
import { NotebookRepo } from '../../../core/interfaces/repo/repo-notebook.interface';
import { TaskRepo } from '../../../core/interfaces/repo/repo-task.interface';
import { RepoCategoryService } from '../../../core/services/repo/repo-category.service';
import { RepoTaskTypeService } from '../../../core/services/repo/repo-tasktype.service';
import { RepoResourceService } from '../../../core/services/repo/repo-resource.service';
// Import for vanilla Bootstrap modal
declare var bootstrap: any;

@Component({
  selector: 'app-repo-tasks',
  imports: [CommonModule, LucideAngularModule, FormsModule, NgxDatatableModule],
  templateUrl: './repo-tasks.component.html',
  styleUrl: './repo-tasks.component.scss'
})
export class RepoTasksComponent {
  // Inject services
  repoTaskService = inject(RepoTaskService);
  repoCategoryService = inject(RepoCategoryService);
  repoTaskTypeService = inject(RepoTaskTypeService);
  repoResourceService = inject(RepoResourceService);
  
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
  ChevronDown = ChevronDown;

  // Force the service to load notebooks initially
  constructor() {
    // This will trigger loading notebooks from the API
    this.repoTaskService.getAllTasksResource.reload();
    
    // Create an effect to automatically update the _notebooks array when allNotebooks() changes
    effect(() => {
      this._tasks = this.repoTaskService.allTasks();
      console.log('Effect triggered: tasks updated', this._tasks);
    });
  }

  get tasks(): TaskRepo[] {
    return this._tasks;
  }

  set tasks(value: TaskRepo[]) {
    this._tasks = value;
  }

  private _tasks: TaskRepo[] = [];
  
  task: TaskRepo = {
    id: 0,
    name: '',
    description: '',
    phaseOrder: 0,
    hasSubTaskRepo: false,
    categoryRepoId: 0,
    taskTypeRepoId: 0,
    taskTypeRepo: {
      id: 0,
      name: ''
    },
    categoryRepo: {
      id: 0,
      name: ''
    },
    taskRepoResources: [],
    subTaskRepo: []
  };
  selected: TaskRepo[] = [];

  private taskModal: any;
  private confirmModal: any;
  private resourcesModal: any;
  private deleteId: number | null = null;
  private temp: TaskRepo[] = [];
  selectedResourcesList: string[] = [];
  selectedResourceIds: number[] = [];
  subtasks: { name: string; description: string }[] = [];
  newSubTask: { name: string; description: string } = { name: '', description: '' };
  SelectionType = SelectionType;

  ngOnInit(): void {
    // Force reload data
    this.repoTaskService.getAllTasksResource.reload();
  }

  // Load tasks from service
  loadTasks(): void {
    // This triggers a reload of the tasks
    this.repoTaskService.getAllTasksResource.reload();
    console.log('Loading tasks, current value:', this.repoTaskService.allTasks());
    
    // Debug resource structure
    setTimeout(() => {
      const firstTaskWithResources = this.repoTaskService.allTasks().find(t => t.taskRepoResources?.length > 0);
      if (firstTaskWithResources) {
        console.log('TASK SAMPLE:', firstTaskWithResources);
        console.log('RESOURCE ARRAY SAMPLE:', firstTaskWithResources.taskRepoResources);
        try {
          if (firstTaskWithResources.taskRepoResources?.length > 0) {
            const resource = firstTaskWithResources.taskRepoResources[0];
            console.log('RESOURCE ITEM SAMPLE:', JSON.stringify(resource));
            // See what properties are available on the resource
            console.log('RESOURCE PROPERTIES:', Object.keys(resource));
            // Try to access resource name directly
            if (resource.resourceRepo) {
              console.log('RESOURCE NAME:', resource.resourceRepo.name);
            }
          }
        } catch (err) {
          console.error('Error accessing resource properties:', err);
        }
      }
      
      // Initialize tooltips after data is loaded
      this.initTooltips();
    }, 1000);
  }

  ngAfterViewInit(): void {
    console.log('ngAfterViewInit called for RepoTasksComponent');
    // Initialize Bootstrap modals after view is initialized
    setTimeout(() => {
      try {
        console.log('Attempting to initialize modals...');
        console.log('Bootstrap available:', typeof bootstrap !== 'undefined');
        console.log('Bootstrap Modal available:', typeof bootstrap?.Modal !== 'undefined');
        
        const taskModalElement = document.getElementById('taskModal');
        const confirmModalElement = document.getElementById('confirmModal');
        const resourcesModalElement = document.getElementById('resourcesModal');
        
        console.log('Modal elements found:', 
          { taskModal: !!taskModalElement, confirmModal: !!confirmModalElement, resourcesModal: !!resourcesModalElement });
        
        if (taskModalElement) {
          this.taskModal = new bootstrap.Modal(taskModalElement);
          console.log('taskModal initialized successfully');
        } else {
          console.error('taskModal element not found');
        }
        
        if (confirmModalElement) {
          this.confirmModal = new bootstrap.Modal(confirmModalElement);
          console.log('confirmModal initialized successfully');
        } else {
          console.error('confirmModal element not found');
        }

        if (resourcesModalElement) {
          this.resourcesModal = new bootstrap.Modal(resourcesModalElement);
          console.log('resourcesModal initialized successfully');
        } else {
          console.error('resourcesModal element not found');
        }
        
        // Initialize tooltips
        this.initTooltips();
      } catch (error) {
        console.error('Error initializing modals:', error);
      }
    }, 500); // Increased timeout to 500ms to ensure the DOM is fully rendered
  }
  
  // Initialize tooltips
  initTooltips(): void {
    try {
      // Dispose any existing tooltips first
      const tooltipElements = document.querySelectorAll('.resource-tooltip');
      tooltipElements.forEach(element => {
        const tooltipInstance = bootstrap.Tooltip.getInstance(element);
        if (tooltipInstance) {
          tooltipInstance.dispose();
        }
      });
      
      // Create new tooltips
      tooltipElements.forEach(element => {
        new bootstrap.Tooltip(element, {
          html: true,
          placement: 'top',
          trigger: 'hover'
        });
      });
      console.log('Tooltips initialized on', tooltipElements.length, 'elements');
    } catch (error) {
      console.error('Error initializing tooltips:', error);
    }
  }
  
  // For search filtering
  updateFilter(event: any): void {
    const val = event.target.value.toLowerCase();
    
    // Always start with fresh data from the service
    if (!val) {
      this.loadTasks();
      return;
    }
    
    // Filter the data from the full dataset
    this._tasks = this.repoTaskService.allTasks().filter(task => 
      task.name.toLowerCase().includes(val) ||
      task.description.toLowerCase().includes(val) ||
      task.id.toString().includes(val)
    );
  }
  
  // Selection handling
  onSelect({ selected }: { selected: TaskRepo[] }): void {
    this.selected = selected;
    this.repoTaskService.selectedTasks.set(selected);
  }
  
  openNew(): void {
    this.loadTasks();  // Reset data
    this.initTask();  // Initialize with empty values
    
    // Reset subtasks and selected resources
    this.subtasks = [];
    this.selectedResourceIds = [];
    
    this.taskModal.show();
  }
  
  // Initialize task with empty values
  initTask(): void {
    this.task = {
      id: 0,
      name: '',
      description: '',
      phaseOrder: 0,
      hasSubTaskRepo: false,
      categoryRepoId: 0,
      taskTypeRepoId: 0,
      taskTypeRepo: {
        id: 0,
        name: ''
      },
      categoryRepo: {
        id: 0,
        name: ''
      },
      taskRepoResources: [],
      subTaskRepo: []
    };
    this.taskModal.show();
  }
  
  editTask(task: TaskRepo): void {
    console.log('Editing task:', task);
    
    // Debug resources structure
    console.log('Resources in task:', JSON.stringify(task.taskRepoResources));
    if (task.taskRepoResources.length > 0) {
      console.log('First resource:', task.taskRepoResources[0]);
    }
    
    this.task = { ...task };
    this.repoTaskService.selectedTask.set(task);
    
    // Reset and populate selectedResourceIds
    this.selectedResourceIds = task.taskRepoResources.map(r => r.resourceRepo?.id).filter(id => id !== undefined) as number[];
    console.log('Selected resource IDs:', this.selectedResourceIds);
    
    // Reset subtasks array - if you have access to subtasks data, populate it here
    this.subtasks = [];
    if (task.subTaskRepo && task.subTaskRepo.length > 0) {
      task.subTaskRepo.forEach(subTask => {
        this.subtasks.push({
          name: subTask.name || '',
          description: subTask.description || ''
        });
      });
    }
    console.log('Subtasks:', this.subtasks);
    
    // Check if the modal is initialized
    if (!this.taskModal) {
      console.error('Modal not initialized!');
      // Initialize again if needed
      setTimeout(() => {
        const taskModalElement = document.getElementById('taskModal');
        if (taskModalElement) {
          this.taskModal = new bootstrap.Modal(taskModalElement);
          this.taskModal.show();
        }
      }, 100);
    } else {
      this.taskModal.show();
    }
  }
  
  hideDialog(): void {
    this.taskModal.hide();
  }
  
  deleteSelectedTasks(id: number): void {
    console.log('deleteSelectedTasks called with id:', id);
    this.deleteId = id;
    
    // Check if the modal is initialized
    if (!this.confirmModal) {
      console.error('Confirm Modal not initialized!');
      // Initialize again if needed
      setTimeout(() => {
        try {
          console.log('Attempting to initialize confirmModal again...');
          const confirmModalElement = document.getElementById('confirmModal');
          if (confirmModalElement) {
            console.log('confirmModal element found, initializing...');
            this.confirmModal = new bootstrap.Modal(confirmModalElement);
            // Try manually showing the modal
            if (this.confirmModal) {
              console.log('confirmModal initialized, showing...');
              this.confirmModal.show();
            } else {
              console.error('Failed to initialize confirmModal');
            }
          } else {
            console.error('confirmModal element still not found');
          }
        } catch (error) {
          console.error('Error re-initializing confirmModal:', error);
        }
      }, 300);
    } else {
      console.log('confirmModal exists, showing...');
      this.confirmModal.show();
    }
  }
  
  dismissConfirm(): void {
    console.log('dismissConfirm called');
    try {
      if (this.confirmModal) {
        console.log('Hiding confirmModal');
        this.confirmModal.hide();
      } else {
        console.warn('confirmModal was not initialized when trying to hide it');
      }
    } catch (error) {
      console.error('Error hiding confirmModal:', error);
    }
    this.deleteId = null;
  }
  
  dismissResourcesModal(): void {
    console.log('dismissResourcesModal called');
    try {
      if (this.resourcesModal) {
        console.log('Hiding resourcesModal');
        this.resourcesModal.hide();
      } else {
        console.warn('resourcesModal was not initialized when trying to hide it');
      }
    } catch (error) {
      console.error('Error hiding resourcesModal:', error);
    }
  }
  
  confirmDelete(): void {
    console.log('confirmDelete called, deleteId:', this.deleteId);
    try {
      if (this.deleteId) {
        console.log('Deleting task with ID:', this.deleteId);
        this.repoTaskService.deleteTask(this.deleteId);
        this.loadTasks();  // Reload after delete
      } else {
        console.warn('No deleteId set when confirmDelete was called');
      }
    } catch (error) {
      console.error('Error in confirmDelete:', error);
    }
    this.dismissConfirm();
  }
  
  saveTask(): void {
    this.repoTaskService.selectedTask.set(this.task);
    console.log("saving task", this.task);
    
    // Extract resource IDs from the taskRepoResources array
    const resourceIds = this.task.taskRepoResources.map(
      resource => resource.resourceRepo?.id
    ).filter(id => id !== undefined) as number[];
    
    console.log("Resource IDs for submission:", resourceIds);
    
    if (this.task.id) {
      // Convert TaskRepo to TaskRepoUpdate format
      const taskUpdate = {
        name: this.task.name,
        description: this.task.description,
        phaseOrder: this.task.phaseOrder,
        hasSubTaskRepo: this.task.hasSubTaskRepo,
        categoryRepoId: this.task.categoryRepoId,
        taskTypeRepoId: this.task.taskTypeRepoId,
        resourceIds: resourceIds
      };
      
      // Update the task first
      this.repoTaskService.editTask(this.task.id, taskUpdate)
        .subscribe({
          next: (updatedTask) => {
            console.log("Task updated successfully:", updatedTask);
            
            // If task has subtasks, handle them
            if (this.task.hasSubTaskRepo && this.subtasks.length > 0) {
              // Save all subtasks - this would need to be implemented in your service
              try {
                // Process each subtask
                this.subtasks.forEach(subtask => {
                  // Create a subtask object
                  const subTaskData = {
                    name: subtask.name,
                    description: subtask.description,
                    taskRepoId: this.task.id
                  };
                  
                  // Call a method to create subtask (this would need to be implemented)
                  console.log("Would create subtask:", subTaskData);
                  // this.repoTaskService.createSubTask(subTaskData).subscribe(...);
                });
              } catch (error) {
                console.error("Error handling subtasks:", error);
              }
            }
            
            // Reload data and close modal
            this.loadTasks();
            this.hideDialog();
          },
          error: (error) => {
            console.error("Error updating task:", error);
          }
        });
    } else {
      // Convert TaskRepo to TaskRepoCreate format
      const taskCreate = {
        name: this.task.name,
        description: this.task.description,
        phaseOrder: this.task.phaseOrder,
        hasSubTaskRepo: this.task.hasSubTaskRepo,
        categoryRepoId: this.task.categoryRepoId,
        taskTypeRepoId: this.task.taskTypeRepoId,
        resourceIds: resourceIds
      };
      
      // Create the new task
      this.repoTaskService.createTask(taskCreate)
        .subscribe({
          next: (createdTask) => {
            console.log("Task created successfully:", createdTask);
            
            // If task has subtasks, create them as well
            if (this.task.hasSubTaskRepo && this.subtasks.length > 0 && createdTask.id) {
              try {
                // Process each subtask
                this.subtasks.forEach(subtask => {
                  // Create a subtask object
                  const subTaskData = {
                    name: subtask.name,
                    description: subtask.description,
                    taskRepoId: createdTask.id
                  };
                  
                  // Call a method to create subtask (this would need to be implemented)
                  console.log("Would create subtask:", subTaskData);
                  // this.repoTaskService.createSubTask(subTaskData).subscribe(...);
                });
              } catch (error) {
                console.error("Error creating subtasks:", error);
              }
            }
            
            // Reset form, reload data and close modal
            this.task = {
              id: 0,
              name: '',
              description: '',
              phaseOrder: 0,
              hasSubTaskRepo: false,
              categoryRepoId: 0,
              taskTypeRepoId: 0,
              taskTypeRepo: {
                id: 0,
                name: ''
              },
              categoryRepo: {
                id: 0,
                name: ''
              },
              taskRepoResources: [],
              subTaskRepo: []
            };
            
            // Reset subtasks array
            this.subtasks = [];
            
            // Reload data and close modal
            this.loadTasks();
            this.hideDialog();
          },
          error: (error) => {
            console.error("Error creating task:", error);
          }
        });
    }
  }
  
  // Reset filter and show all data
  resetFilter(): void {
    this.loadTasks();
  }
  
  exportCSV(): void {
    // Implementation in the future, need to find a proper library
  }
  
  // Show resources modal
  showResourcesModal(task: TaskRepo): void {
    console.log('Full task object:', JSON.stringify(task));
    console.log('Task resources array:', task.taskRepoResources);
    
    // Check for empty resources
    if (!task.taskRepoResources || task.taskRepoResources.length === 0) {
      this.selectedResourcesList = ['No resources found'];
    } else {
      try {
        // Directly access and log the first resource to debug
        if (task.taskRepoResources.length > 0) {
          const firstResource = task.taskRepoResources[0];
          console.log('First resource object:', firstResource);
          console.log('Resource repo:', firstResource.resourceRepo);
          console.log('Resource name from first item:', firstResource.resourceRepo?.name);
        }
        
        // Try different approaches to extract resource names
        this.selectedResourcesList = [];
        
        // Approach 1: Direct access with error handling
        for (const resource of task.taskRepoResources) {
          if (resource && resource.resourceRepo && resource.resourceRepo.name) {
            this.selectedResourcesList.push(resource.resourceRepo.name);
          } else if (resource && resource.resourceRepo) {
            this.selectedResourcesList.push(`Resource ID: ${resource.resourceRepo.id || 'unknown'}`);
          } else {
            this.selectedResourcesList.push('Unnamed Resource');
          }
        }
        
        console.log('Extracted resource names:', this.selectedResourcesList);
      } catch (error) {
        console.error('Error extracting resource names:', error);
        this.selectedResourcesList = ['Error displaying resources'];
      }
    }
    
    // Show the modal
    if (this.resourcesModal) {
      this.resourcesModal.show();
    } else {
      // Try to initialize modal if it wasn't ready
      const resourcesModalElement = document.getElementById('resourcesModal');
      if (resourcesModalElement) {
        this.resourcesModal = new bootstrap.Modal(resourcesModalElement);
        this.resourcesModal.show();
      } else {
        console.error('resourcesModal element not found');
      }
    }
  }
  
  // Generate HTML for resource tooltip
  getResourceTooltip(task: TaskRepo): string {
    if (!task.taskRepoResources || task.taskRepoResources.length === 0) {
      return 'No resources';
    }
    
    let tooltipContent = '<div class="text-start">';
    tooltipContent += '<strong>Resources:</strong><br>';
    
    // Extract resource names
    const resourceNames: string[] = [];
    for (const resource of task.taskRepoResources) {
      if (resource?.resourceRepo?.name) {
        resourceNames.push(resource.resourceRepo.name);
      }
    }
    
    if (resourceNames.length === 0) {
      tooltipContent += '<em>No named resources found</em>';
    } else {
      tooltipContent += resourceNames.map(name => `• ${name}`).join('<br>');
    }
    
    tooltipContent += '</div>';
    return tooltipContent;
  }
  
  // Check if a resource is selected
  isResourceSelected(resourceId: number): boolean {
    if (!this.task.taskRepoResources) return false;
    return this.task.taskRepoResources.some(
      resource => resource.resourceRepo && resource.resourceRepo.id === resourceId
    );
  }
  
  // Toggle resource selection
  toggleResource(resource: any): void {
    console.log('Toggle resource:', resource);
    
    if (!this.task.taskRepoResources) {
      this.task.taskRepoResources = [];
    }
    
    // Check if the resource is already selected
    const index = this.task.taskRepoResources.findIndex(
      r => r.resourceRepo && r.resourceRepo.id === resource.id
    );
    
    // Also update the selectedResourceIds array for the badge counter
    const idIndex = this.selectedResourceIds.indexOf(resource.id);
    
    if (index >= 0) {
      // Resource is already selected, remove it
      this.task.taskRepoResources.splice(index, 1);
      
      // Remove from selectedResourceIds if present
      if (idIndex !== -1) {
        this.selectedResourceIds.splice(idIndex, 1);
      }
    } else {
      // Resource is not selected, add it
      const newResource = {
        resourceRepo: {
          id: resource.id,
          name: resource.name
        }
      };
      this.task.taskRepoResources.push(newResource);
      
      // Add to selectedResourceIds if not already there
      if (idIndex === -1) {
        this.selectedResourceIds.push(resource.id);
      }
    }
    
    console.log('Updated resources:', this.task.taskRepoResources);
    console.log('Selected resource IDs:', this.selectedResourceIds);
  }

  // Add a new subtask to the subtasks array
  addSubTask(): void {
    if (this.newSubTask.name.trim()) {
      this.subtasks.push({...this.newSubTask});
      // Reset the new subtask form
      this.newSubTask = { name: '', description: '' };
    }
  }

  // Remove a subtask from the subtasks array
  removeSubTask(index: number): void {
    this.subtasks.splice(index, 1);
  }
}
