import { Component, computed, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProjectService } from '../../../../core/services/project/project.service';
import { ProjectTaskService } from '../../../../core/services/project/project-task.service';
import { ProjectPhase } from '../../../../core/interfaces/project/project-phase.interface';
import { ProjectTask } from '../../../../core/interfaces/project/project-task.interface';
import { ProjectTaskCategory } from '../../../../core/interfaces/project/project-task-category.interface';

type StatusFilter = 'all' | 'active' | 'late' | 'completed';

@Component({
  selector: 'app-details-project-tasks',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="task-dashboard">
      <!-- Header with task count and filters -->
      <div class="card mb-4">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-center mb-3">
            <div>
              <h5 class="mb-0">{{ taskCounts().all }} tasks</h5>
              <!-- Task completion progress bar -->
              <div class="progress mt-2" style="height: 6px; width: 150px;">
                <div class="progress-bar bg-success" role="progressbar" 
                    [style.width.%]="taskCompletionPercentage()" 
                    [attr.aria-valuenow]="taskCounts().completed" 
                    aria-valuemin="0" 
                    [attr.aria-valuemax]="taskCounts().all"
                    [attr.title]="taskCounts().completed + ' of ' + taskCounts().all + ' tasks completed'"></div>
              </div>
              <small class="text-muted">{{ taskCounts().completed }} completed</small>
            </div>
            <div class="d-flex">
              <!-- Categories Dropdown -->
              <div class="me-2">
                <select class="form-select" (change)="setCategoryId($event)">
                  <option [value]="0" [selected]="selectedCategoryId() === 0">All Categories</option>
                  @for (category of allCategories(); track category.id) {
                    <option [value]="category.id" [selected]="selectedCategoryId() === category.id">
                      {{ category.name }}
                    </option>
                  }
                </select>
              </div>
              <!-- Show/Hide Completed Tasks Toggle -->
              <div>
                <button 
                  class="btn" 
                  [class.btn-success]="showCompleted()" 
                  [class.btn-outline-secondary]="!showCompleted()"
                  (click)="toggleShowCompleted()"
                  [attr.title]="showCompleted() ? 'Hide completed tasks' : 'Show completed tasks'"
                >
                  <i class="bi" [ngClass]="showCompleted() ? 'bi-eye-fill' : 'bi-eye-slash-fill'"></i>
                  {{ showCompleted() ? 'Hide Completed' : 'Show Completed' }}
                </button>
              </div>
            </div>
          </div>
          
          <!-- Filter tabs -->
          <ul class="nav nav-tabs">
            <li class="nav-item">
              <a class="nav-link" [class.active]="statusFilter() === 'all'" href="#" 
                 (click)="$event.preventDefault(); setStatusFilter('all')">
                All
                <span class="badge bg-secondary ms-1">{{ taskCounts().all }}</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" [class.active]="statusFilter() === 'active'" href="#" 
                 (click)="$event.preventDefault(); setStatusFilter('active')">
                Active
                <span class="badge bg-primary ms-1">{{ taskCounts().active }}</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" [class.active]="statusFilter() === 'late'" href="#" 
                 (click)="$event.preventDefault(); setStatusFilter('late')">
                Late
                <span class="badge bg-danger ms-1">{{ taskCounts().late }}</span>
              </a>
            </li>
            <li class="nav-item">
              <a class="nav-link" [class.active]="statusFilter() === 'completed'" href="#" 
                 (click)="$event.preventDefault(); setStatusFilter('completed')">
                Completed
                <span class="badge bg-success ms-1">{{ taskCounts().completed }}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <!-- Phases with Tasks -->
      @if (filteredPhases().length === 0) {
        <div class="card">
          <div class="card-body text-center p-5">
            <div class="mb-3">
              <i class="bi bi-check2-circle fs-1 text-muted"></i>
            </div>
            <h5>No tasks found</h5>
            <p class="text-muted">
              Try changing your filter criteria.
            </p>
          </div>
        </div>
      } @else {
        @for (phase of filteredPhases(); track phase.id) {
          <div class="card mb-3">
            <!-- Phase header -->
            <div class="card-header d-flex justify-content-between align-items-center">
              <h6 class="mb-0">
                <button class="btn btn-link text-decoration-none p-0" 
                        (click)="togglePhaseCollapse(phase.id)">
                  <i class="bi" [ngClass]="isPhaseCollapsed(phase.id) ? 'bi-chevron-right' : 'bi-chevron-down'"></i>
                  {{ phase.name }}
                </button>
              </h6>
              <div class="d-flex align-items-center">
                <span class="badge ms-2" [ngClass]="getPhaseStatusClass(phase)">
                  {{ getPhaseStatusLabel(phase) }}
                </span>
                <span class="ms-2 badge bg-secondary">{{ getFilteredTasks(phase).length }}</span>
              </div>
            </div>
            
            <!-- Tasks in this phase -->
            <div class="card-body p-0" [ngClass]="{'d-none': isPhaseCollapsed(phase.id)}">
              <div class="list-group list-group-flush">
                @if (getFilteredTasks(phase).length === 0) {
                  <div class="list-group-item text-center py-4">
                    <p class="mb-0 text-muted">No tasks in this phase match your filters.</p>
                  </div>
                } @else {
                  @for (task of getFilteredTasks(phase); track task.id) {
                    <div class="list-group-item task-item">
                      <div class="d-flex align-items-start gap-2">
                        <!-- Task status indicator with completion functionality -->
                        <div class="form-check mt-1 position-relative">
                          <input 
                            class="form-check-input" 
                            type="checkbox" 
                            [checked]="task.status === 2"
                            [disabled]="isTaskLoading(task.id)"
                            (change)="completeTask(task)"
                          >
                          @if (isTaskLoading(task.id)) {
                            <div class="position-absolute" style="top: -2px; left: 20px;">
                              <span class="spinner-border spinner-border-sm text-primary"></span>
                            </div>
                          }
                        </div>
                        
                        <!-- Task info -->
                        <div class="flex-grow-1">
                          <div class="d-flex justify-content-between align-items-start mb-1">
                            <div>
                              <h6 class="mb-0" [class.text-decoration-line-through]="task.status === 2">{{ task.name }}</h6>
                              <p class="text-muted small mb-1">{{ task.description }}</p>
                            </div>
                            <div class="d-flex align-items-center gap-2">
                              @for (category of task.projectTaskCategories; track category.id) {
                                <span class="badge bg-info">{{ category.name }}</span>
                              }
                              <span class="badge" [ngClass]="getTaskStatusClass(task)">
                                {{ getTaskStatusLabel(task) }}
                              </span>
                            </div>
                          </div>
                          
                          <!-- Task metadata -->
                          <div class="d-flex align-items-center gap-3">
                            <div class="small text-secondary">
                              <i class="bi bi-calendar-event me-1"></i>
                              <span [ngClass]="{'text-danger': task.status === 6}">
                                Due {{ task.endDate | date:'MMM d, yyyy' }}
                              </span>
                            </div>
                            
                            @if (task.projectTaskComments?.length) {
                              <div class="small text-secondary">
                                <i class="bi bi-chat-dots me-1"></i>
                                <span>{{ task.projectTaskComments.length }}</span>
                              </div>
                            }
                          </div>
                        </div>
                      </div>
                    </div>
                  }
                }
              </div>
            </div>
          </div>
        }
      }
    </div>
  `,
  styles: [`
    .task-dashboard {
      .nav-tabs {
        position: sticky;
        top: 0;
        z-index: 1000;
        background-color: white;
        border-bottom: 1px solid #dee2e6;
        box-shadow: 0 2px 4px rgba(0,0,0,0.05);
        margin-bottom: 1rem;
        
        .nav-link {
          color: var(--bs-body-color);
          border-bottom-width: 2px;
          
          &.active {
            border-bottom-color: var(--bs-primary);
            color: var(--bs-primary);
            font-weight: 500;
          }
        }
      }
      
      .task-item {
        transition: background-color 0.15s ease-in-out;
        
        &:hover {
          background-color: rgba(var(--bs-primary-rgb), 0.03);
        }
      }
      
      .card-header {
        position: sticky;
        top: 48px; // Height of the tabs
        z-index: 990;
        background-color: white;
        border-bottom: 1px solid #dee2e6;
        background-color: rgba(var(--bs-light-rgb), 0.5);
        
        .btn-link {
          color: var(--bs-body-color);
          font-weight: 500;
        }
      }
      
      .form-check-input:checked {
        background-color: var(--bs-success);
        border-color: var(--bs-success);
      }
      
      .text-danger {
        font-weight: 500;
      }
    }
  `]
})
export class DetailsProjectTasksComponent {
  projectService = inject(ProjectService);
  projectTaskService = inject(ProjectTaskService);
  
  // Filter state
  statusFilter = signal<StatusFilter>('all');
  selectedCategoryId = signal<number>(0);
  showCompleted = signal<boolean>(true);
  
  // UI state
  loadingTasks = signal<Record<number, boolean>>({});
  collapsedPhases = signal<Record<number, boolean>>({});
  
  // Get all project phases
  phases = computed(() => {
    return this.projectService.projectDetails()?.projectPhases || [];
  });

  // Calculate task counts for filters
  taskCounts = computed(() => {
    let all = 0;
    let active = 0;
    let late = 0;
    let completed = 0;
    
    this.phases().forEach(phase => {
      phase.projectTasks.forEach(task => {
        all++;
        if (task.status === 1) active++;
        if (task.status === 6) late++;
        if (task.status === 2) completed++;
      });
    });
    
    return { all, active, late, completed };
  });

  // Calculate the completion percentage
  taskCompletionPercentage = computed(() => {
    const { all, completed } = this.taskCounts();
    if (all === 0) return 0;
    return Math.round((completed / all) * 100);
  });

  // Get all unique categories
  allCategories = computed(() => {
    const categories: ProjectTaskCategory[] = [];
    const uniqueIds = new Set<number>();
    const uniqueNames = new Set<string>();
    
    // First collect categories from phases
    this.phases().forEach(phase => {
      phase.projectTaskCategories.forEach(category => {
        if (!uniqueIds.has(category.id) && !uniqueNames.has(category.name)) {
          uniqueIds.add(category.id);
          uniqueNames.add(category.name);
          categories.push(category);
        }
      });
    });
    
    // Then collect categories from tasks to ensure we have all possible categories
    this.phases().forEach(phase => {
      phase.projectTasks.forEach(task => {
        if (task.projectTaskCategories && task.projectTaskCategories.length > 0) {
          task.projectTaskCategories.forEach(category => {
            if (!uniqueIds.has(category.id) && !uniqueNames.has(category.name)) {
              uniqueIds.add(category.id);
              uniqueNames.add(category.name);
              categories.push(category);
            }
          });
        }
      });
    });
    
    return categories;
  });

  // Get filtered phases based on task filters
  filteredPhases = computed(() => {
    // Start with all phases sorted by order
    const allPhases = [...this.phases()].sort((a, b) => a.order - b.order);
    
    // Only return phases that have tasks matching our filters
    return allPhases.filter(phase => {
      const matchingTasks = this.getFilteredTasks(phase);
      return matchingTasks.length > 0;
    });
  });

  constructor() {
    // Initialize UI state if needed
  }

  setStatusFilter(status: StatusFilter): void {
    this.statusFilter.set(status);
  }

  setCategoryId(event: Event): void {
    const select = event.target as HTMLSelectElement;
    this.selectedCategoryId.set(Number(select.value));
  }

  toggleShowCompleted(): void {
    this.showCompleted.update(value => !value);
  }

  togglePhaseCollapse(phaseId: number): void {
    this.collapsedPhases.update(state => ({
      ...state,
      [phaseId]: !state[phaseId]
    }));
  }

  isPhaseCollapsed(phaseId: number): boolean {
    return this.collapsedPhases()[phaseId] === true;
  }

  getFilteredTasks(phase: ProjectPhase): ProjectTask[] {
    return phase.projectTasks.filter(task => {
      // Status filter
      if (this.statusFilter() === 'active' && task.status !== 1) {
        return false;
      }
      if (this.statusFilter() === 'late' && task.status !== 6) {
        return false;
      }
      if (this.statusFilter() === 'completed' && task.status !== 2) {
        return false;
      }
      
      // Category filter
      if (this.selectedCategoryId() !== 0) {
        // Check if the task has a category with the selected ID
        const categoryExists = task.projectTaskCategories?.some(
          category => category.id === this.selectedCategoryId()
        );
        
        if (!categoryExists) {
          return false;
        }
      }
      
      // Show/hide completed tasks
      if (!this.showCompleted() && task.status === 2) {
        return false;
      }
      
      return true;
    });
  }

  isTaskLoading(taskId: number): boolean {
    return this.loadingTasks()[taskId] === true;
  }

  completeTask(task: ProjectTask): void {
    // Toggle the task status between completed and active
    const newStatus = task.status === 2 ? 1 : 2;
    
    // Set loading state for this task
    this.loadingTasks.update(state => ({
      ...state,
      [task.id]: true
    }));
    
    // Optimistically update the UI
    task.status = newStatus;

    // Call the API to update on the server
    this.projectTaskService.completeProjectTask(task.id).subscribe({
      next: () => {
        // Reload the project details to get the updated task status
        this.projectService.getProjectResource.reload();

        // Clear loading state
        this.loadingTasks.update(state => ({
          ...state,
          [task.id]: false
        }));
      },
      error: (error) => {
        console.error('Error completing task:', error);
        
        // Revert the optimistic update
        task.status = newStatus === 2 ? 1 : 2;
        
        // Clear loading state
        this.loadingTasks.update(state => ({
          ...state,
          [task.id]: false
        }));
      }
    });
  }

  getTaskStatusLabel(task: ProjectTask): string {
    switch(task.status) {
      case 0: return 'Upcoming';
      case 1: return 'Active';
      case 2: return 'Completed';
      case 3: return 'Cancelled';
      case 4: return 'Delayed';
      case 5: return 'Postponed';
      case 6: return 'Late';
      default: return 'Unknown';
    }
  }

  getTaskStatusClass(task: ProjectTask): string {
    switch(task.status) {
      case 0: return 'bg-info';
      case 1: return 'bg-primary';
      case 2: return 'bg-success';
      case 3: return 'bg-secondary';
      case 4: return 'bg-warning';
      case 5: return 'bg-warning';
      case 6: return 'bg-danger';
      default: return 'bg-secondary';
    }
  }

  getPhaseStatusLabel(phase: ProjectPhase): string {
    switch(phase.status) {
      case 0: return 'Upcoming';
      case 1: return 'Active';
      case 2: return 'Completed';
      case 3: return 'Cancelled';
      case 4: return 'Delayed';
      case 5: return 'Postponed';
      case 6: return 'Late';
      default: return 'Unknown';
    }
  }

  getPhaseStatusClass(phase: ProjectPhase): string {
    switch(phase.status) {
      case 0: return 'bg-info';
      case 1: return 'bg-primary';
      case 2: return 'bg-success';
      case 3: return 'bg-secondary';
      case 4: return 'bg-warning';
      case 5: return 'bg-warning';
      case 6: return 'bg-danger';
      default: return 'bg-secondary';
    }
  }
} 