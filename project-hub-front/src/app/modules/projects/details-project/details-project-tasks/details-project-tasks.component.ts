import { Component, computed, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectService } from '@/core/services/project/project.service';
import { ProjectTaskService } from '@/core/services/project/project-task.service';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { DropdownModule } from 'primeng/dropdown';
import { BadgeModule } from 'primeng/badge';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { ProjectTask } from '@/core/interfaces/project/project-task.interface';
import { TaskStatus, TaskStatusColors, TaskStatusLabels } from '@/core/interfaces/project/project-task-status.enum';
import { DialogModule } from 'primeng/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ProjectPhase } from '@/core/interfaces/project/project-phase.interface';
import { FormsModule } from '@angular/forms';
import { DividerModule } from 'primeng/divider';
import { ChipModule } from 'primeng/chip';
import { DrawerModule } from 'primeng/drawer';
import { CheckboxModule } from 'primeng/checkbox';
import { FluidModule } from 'primeng/fluid';

// Category interface for strong typing
interface ProjectTaskCategory {
  id: number;
  name: string;
  description?: string;
}

// Extended ProjectTask with additional properties for the UI
interface ExtendedProjectTask extends Omit<ProjectTask, 'projectTaskCategories'> {
  phaseName?: string;
  projectSubTasks?: any[]; // Extend with appropriate subtask type
  projectTaskCategory?: ProjectTaskCategory; // Single category - this matches the actual API response
  projectTaskCategories?: ProjectTaskCategory[]; // Making it optional for compatibility with our interface
}

// Utility type for comments since they might not have user properties in the current API
interface TaskComment {
  commentText: string;
  createdAt: Date;
  user?: {
    firstName?: string;
    lastName?: string;
  };
}

@Component({
  selector: 'app-details-project-tasks',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    TableModule,
    ButtonModule,
    TagModule,
    TooltipModule,
    DropdownModule,
    BadgeModule,
    ConfirmDialogModule,
    DialogModule,
    ReactiveFormsModule,
    InputTextModule,
    FormsModule,
    DividerModule,
    ChipModule,
    DrawerModule,
    CheckboxModule,
    FluidModule 
  ],
  providers: [ConfirmationService],
  templateUrl: './details-project-tasks.component.html',
  styleUrl: './details-project-tasks.component.scss'
})
export class DetailsProjectTasksComponent {
  projectService = inject(ProjectService);
  projectTaskService = inject(ProjectTaskService);
  confirmationService = inject(ConfirmationService);
  
  // For template calculations
  Math = Math;
  
  // State
  categoryDrawer = signal(false);
  taskDialogVisible = signal(false);
  selectedTask = signal<ExtendedProjectTask | null>(null);
  selectedPhase = signal<ProjectPhase | null>(null);
  filterText = signal('');
  statusFilter = signal<TaskStatus | 'all'>('all');
  categoryFilter = signal<number | 'all'>('all');
  
  // Category filter properties
  categoryOptions = signal<{ label: string; value: number | null }[]>([
    { label: 'All Categories', value: null }
  ]);
  selectedCategory: number | null = null;
  
  // Make enums available to the template
  TaskStatus = TaskStatus;
  TaskStatusLabels = TaskStatusLabels;
  TaskStatusColors = TaskStatusColors;
  
  // Project phases
  projectPhases = computed(() => this.projectService.projectDetails()?.projectPhases || []);
  
  // Category Drawer Toggle
  toggleCategoryDrawer() {
    this.categoryDrawer.set(!this.categoryDrawer());
  }

  // All categories across all phases
  allCategories = computed(() => {
    const categories = new Map<number, ProjectTaskCategory>();
    
    // First get categories from phase.projectTaskCategories
    this.projectPhases().forEach(phase => {
      if (phase.projectTaskCategories) {
        phase.projectTaskCategories.forEach(category => {
          categories.set(category.id, category);
        });
      }
    });
    
    // Then check individual tasks for projectTaskCategory
    this.allUnfilteredTasks().forEach(task => {
      if (task.projectTaskCategory) {
        categories.set(task.projectTaskCategory.id, task.projectTaskCategory);
      }
    });
    
    return Array.from(categories.values());
  });
  
  // Tasks from all phases with additional properties
  allTasks = computed<ExtendedProjectTask[]>(() => {
    const phases = this.projectPhases();
    return phases.flatMap(phase => 
      phase.projectTasks.map(task => ({
        ...task,
        phaseName: phase.name
      }))
    ).filter(task => this.matchesFilters(task));
  });
  
  // Original unfiltered tasks (used for counting categories)
  allUnfilteredTasks = computed<ExtendedProjectTask[]>(() => {
    const phases = this.projectPhases();
    return phases.flatMap(phase => 
      phase.projectTasks.map(task => ({
        ...task,
        phaseName: phase.name
      }))
    );
  });
  
  // Filtered tasks
  upcomingTasks = computed(() => 
    this.allTasks().filter(task => task.status === TaskStatus.Upcoming)
  );
  
  activeTasks = computed(() => 
    this.allTasks().filter(task => task.status === TaskStatus.Active)
  );
  
  // Late tasks (status 6)
  lateTasks = computed(() => 
    this.allTasks().filter(task => task.status === TaskStatus.Late)
  );
  
  // All completed tasks (including ones normally hidden by filters)
  allCompletedTasks = computed(() => 
    this.allUnfilteredTasks().filter(task => task.status === TaskStatus.Completed)
  );
  
  // Filtered completed tasks (only those matching current filters)
  completedTasks = computed(() => 
    this.allTasks().filter(task => task.status === TaskStatus.Completed)
  );
  
  delayedTasks = computed(() => 
    this.allTasks().filter(task => [TaskStatus.Delayed, TaskStatus.Postponed, TaskStatus.Late].includes(task.status))
  );
  
  cancelledTasks = computed(() => 
    this.allTasks().filter(task => task.status === TaskStatus.Cancelled)
  );
  
  constructor() {
    // Setup effect to initialize categories when project data changes
    effect(() => {
      if (this.projectPhases().length > 0) {
        this.initializeCategoryOptions();
      }
    });
  }
  
  // Methods
  getTasksByPhase(phase: ProjectPhase): ExtendedProjectTask[] {
    return phase.projectTasks
      .map(task => ({ ...task, phaseName: phase.name }))
      .filter(task => this.matchesFilters(task));
  }
  
  /**
   * Check if there are any active filters
   */
  hasActiveFilters(): boolean {
    return this.statusFilter() !== 'all' || 
           this.categoryFilter() !== 'all' || 
           this.filterText().length > 0;
  }
  
  /**
   * Get user-friendly label for the current status filter
   */
  getStatusFilterLabel(): string {
    if (this.statusFilter() === 'all') {
      return 'All';
    }
    return TaskStatusLabels[this.statusFilter() as TaskStatus];
  }
  
  /**
   * Get user-friendly label for the current category filter
   */
  getCategoryFilterLabel(): string {
    if (this.categoryFilter() === 'all') {
      return 'All Categories';
    }
    
    // Find the category name from options
    const selectedOption = this.categoryOptions().find(option => option.value === this.categoryFilter());
    return selectedOption?.label || 'Unknown Category';
  }
  
  /**
   * Clear the status filter
   */
  clearStatusFilter(): void {
    this.statusFilter.set('all');
  }
  
  /**
   * Clear the category filter
   */
  clearCategoryFilter(): void {
    this.categoryFilter.set('all');
    this.selectedCategory = null;
  }
  
  /**
   * Clear the search filter
   */
  clearSearchFilter(input?: HTMLInputElement): void {
    this.filterText.set('');
    if (input) {
      input.value = '';
    }
  }
  
  matchesFilters(task: ExtendedProjectTask): boolean {
    // Debug logging
    const isCompletedTask = task.status === TaskStatus.Completed;
    const isCompletedFilter = this.statusFilter() === TaskStatus.Completed;
    
    // Hide completed tasks unless explicitly viewing completed
    if (isCompletedTask && !isCompletedFilter) {
      // Task is completed but we're not in the "completed" filter view
      return false;
    }
    
    const textMatch = this.filterText() === '' || 
      task.name.toLowerCase().includes(this.filterText().toLowerCase()) ||
      (task.description?.toLowerCase()?.includes(this.filterText().toLowerCase()) ?? false);
    
    const statusMatch = this.statusFilter() === 'all' || task.status === this.statusFilter();
    
    // Check if the category ID matches
    let categoryMatch = this.categoryFilter() === 'all';
    
    if (!categoryMatch) {
      const categoryId = this.categoryFilter();
      let categoryName = '';
      
      // Get the category name for this ID
      this.projectPhases().forEach(phase => {
        if (phase.projectTaskCategories) {
          const category = phase.projectTaskCategories.find(cat => cat.id === categoryId);
          if (category) {
            categoryName = category.name;
          }
        }
      });
      
      if (categoryName) {
        // Check direct category match
        if (task.projectTaskCategory && task.projectTaskCategory.name === categoryName) {
          categoryMatch = true;
        }
        
        // Check category ID
        else if ('projectTaskCategoryId' in task) {
          const taskCategoryId = (task as any).projectTaskCategoryId;
          // Find if this ID matches a category with the target name
          this.projectPhases().forEach(phase => {
            if (phase.projectTaskCategories) {
              const matchingCategory = phase.projectTaskCategories.find(
                cat => cat.id === taskCategoryId && cat.name === categoryName
              );
              if (matchingCategory) {
                categoryMatch = true;
              }
            }
          });
        }
        
        // Check categories array
        else if (task.projectTaskCategories && task.projectTaskCategories.length > 0) {
          if (task.projectTaskCategories.some(cat => cat.name === categoryName)) {
            categoryMatch = true;
          }
        }
      }
    }
    
    return textMatch && statusMatch && categoryMatch;
  }
  
  applyFilter(text: string): void {
    this.filterText.set(text);
  }
  
  filterByStatus(status: TaskStatus | 'all'): void {
    this.statusFilter.set(status);
  }
  
  filterByCategory(categoryId: number | 'all'): void {
    this.categoryFilter.set(categoryId);
    this.selectedCategory = categoryId === 'all' ? null : categoryId;
  }
  
  /**
   * Initializes category options for the filter dropdown
   */
  initializeCategoryOptions(): void {
    // Reset options with just "All Categories"
    const options: { label: string; value: number | null }[] = [
      { label: 'All Categories', value: null }
    ];

    // First, collect all categories from phases
    const phaseCategories = new Map<number, ProjectTaskCategory>();
    const categoryNameMap = new Map<string, number[]>(); // Map of category name to ID array

    // Get all categories from all phases
    this.projectPhases().forEach(phase => {
      if (phase.projectTaskCategories && phase.projectTaskCategories.length > 0) {
        console.log(`Phase ${phase.id} has ${phase.projectTaskCategories.length} categories:`, phase.projectTaskCategories);
        phase.projectTaskCategories.forEach(category => {
          if (category && category.id && category.name) {
            // Store by ID
            phaseCategories.set(category.id, category);
            
            // Also track by name for deduplication
            if (!categoryNameMap.has(category.name)) {
              categoryNameMap.set(category.name, []);
            }
            categoryNameMap.get(category.name)?.push(category.id);
          }
        });
      }
    });
    
    console.log('All category names map:', categoryNameMap);
    
    // Get unique category names and sort them
    const uniqueCategoryNames = Array.from(categoryNameMap.keys()).sort();
    
    // Add one entry per unique category name
    uniqueCategoryNames.forEach(categoryName => {
      const categoryIds = categoryNameMap.get(categoryName) || [];
      if (categoryIds.length > 0) {
        // Take first ID from the list for this category name
        const firstId = categoryIds[0];
        options.push({
          label: categoryName,
          value: firstId
        });
      }
    });
    
    console.log('Final category options (deduplicated by name):', options);
    
    // Update category options
    this.categoryOptions.set(options);
  }
  
  /**
   * Count tasks for a specific category by name
   */
  getCategoryTaskCount(categoryId: number): number {
    // Get the category name for this ID
    let categoryName = '';
    this.projectPhases().forEach(phase => {
      if (phase.projectTaskCategories) {
        const category = phase.projectTaskCategories.find(cat => cat.id === categoryId);
        if (category) {
          categoryName = category.name;
        }
      }
    });
    
    if (!categoryName) {
      return 0; // Category not found
    }
    
    // Find all tasks that match ANY category with this name
    return this.allUnfilteredTasks().filter(task => {
      // Check main category property
      if (task.projectTaskCategory && task.projectTaskCategory.name === categoryName) {
        return true;
      }
      
      // Check category ID
      if ('projectTaskCategoryId' in task) {
        const taskCategoryId = (task as any).projectTaskCategoryId;
        // Find the category with this ID to check its name
        let matchesName = false;
        this.projectPhases().forEach(phase => {
          if (phase.projectTaskCategories) {
            const category = phase.projectTaskCategories.find(cat => cat.id === taskCategoryId);
            if (category && category.name === categoryName) {
              matchesName = true;
            }
          }
        });
        if (matchesName) {
          return true;
        }
      }
      
      // Check categories array
      if (task.projectTaskCategories && task.projectTaskCategories.length > 0) {
        if (task.projectTaskCategories.some(cat => cat.name === categoryName)) {
          return true;
        }
      }
      
      return false;
    }).length;
  }
  
  getStatusSeverity(status: TaskStatus): 'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'contrast' {
    const color = TaskStatusColors[status];
    // Map our color names to PrimeNG's severity options
    switch (color) {
      case 'info': return 'info';
      case 'warning': return 'warn';
      case 'success': return 'success';
      case 'danger': return 'danger';
      default: return 'info';
    }
  }
  
  getPhaseStatusSeverity(status: number): 'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'contrast' {
    // Map phase status to severities
    switch (status) {
      case 0: return 'info';      // Upcoming
      case 1: return 'warn';      // Active
      case 2: return 'success';   // Completed
      case 3: return 'danger';    // Cancelled
      case 4: return 'warn';      // Delayed
      case 5: return 'danger';    // Postponed
      case 6: return 'danger';    // Late
      default: return 'info';
    }
  }
  
  getPhaseStatusLabel(status: number): string {
    // Map phase status to labels
    switch (status) {
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
  
  getStatusLabel(status: TaskStatus): string {
    return TaskStatusLabels[status];
  }
  
  showTaskDialog(task: ExtendedProjectTask | null = null, phase: ProjectPhase | null = null): void {
    this.selectedTask.set(task);
    this.selectedPhase.set(phase);
    this.taskDialogVisible.set(true);
  }
  
  hideTaskDialog(): void {
    this.taskDialogVisible.set(false);
    this.selectedTask.set(null);
    this.selectedPhase.set(null);
  }
  
  handleTaskClick(task: ExtendedProjectTask): void {
    this.showTaskDialog(task);
  }
  
  confirmDelete(event: Event, task: ExtendedProjectTask): void {
    event.stopPropagation();
    
    this.confirmationService.confirm({
      message: `Are you sure you want to delete the task "${task.name}"?`,
      header: 'Confirm Delete',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        // TODO: Implement actual delete logic
        console.log('Delete task', task);
      }
    });
  }

  selectCategoryAndClose(categoryId: number | 'all'): void {
    this.filterByCategory(categoryId);
    this.categoryDrawer.set(false);
  }

  /**
   * Complete a task
   * @param task The task to complete
   */
  completeTask(task: ExtendedProjectTask): void {
    console.log('Before completing, task status:', task.status);
    
    // Only proceed if the task is not already completed
    if (task.status !== TaskStatus.Completed) {
      // First update UI immediately for better user experience
      task.status = TaskStatus.Completed;
      console.log('After setting status, task status:', task.status);
      
      // If we're looking at the 'Completed' filter, make the task stay visible
      if (this.statusFilter() === TaskStatus.Completed) {
        // Refresh the UI
        this.filterText.update(val => val + '');
        this.filterText.update(val => val.substring(0, val.length - 1));
      }
      
      // Then call the API to persist the change
      this.projectTaskService.completeProjectTask(task.id).subscribe({
        next: (response) => {
          console.log('API response:', response);
          // Force reload of the project details
          this.projectService.getProjectResource.reload();
          console.log(`Task ${task.name} completed successfully`);
          
          // If Completed filter is active, make sure the UI shows the update
          if (this.statusFilter() === TaskStatus.Completed) {
            setTimeout(() => {
              // Extra refresh after a short delay to ensure data is reloaded
              this.filterText.update(val => val + '');
              this.filterText.update(val => val.substring(0, val.length - 1));
            }, 300);
          }
        },
        error: (err: unknown) => {
          // Revert the UI update on error
          task.status = TaskStatus.Active;
          console.error('Error completing task:', err);
          
          // Force UI refresh again
          this.filterText.update(val => val + '');
          this.filterText.update(val => val.substring(0, val.length - 1));
        }
      });
    }
  }
}
