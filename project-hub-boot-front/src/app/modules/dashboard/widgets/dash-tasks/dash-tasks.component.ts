import { CommonModule } from '@angular/common';
import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ProjectService } from '../../../../core/services/project/project.service';
import { Project } from '../../../../core/interfaces/project/project.interface';
import { ProjectPhase } from '../../../../core/interfaces/project/project-phase.interface';
import { ProjectTask } from '../../../../core/interfaces/project/project-task.interface';
import { FormsModule } from '@angular/forms';
import { ProjectTaskCategory } from '../../../../core/interfaces/project/project-task-category.interface';
import { ProjectTaskService } from '../../../../core/services/project/project-task.service';

// Task status enum to match backend values
export enum TaskStatus {
  Upcoming = 0,
  Active = 1,
  Completed = 2,
  Cancelled = 3,
  Delayed = 4,
  Postponed = 5,
  Late = 6
}

// Task status labels for display
export const TaskStatusLabels: Record<TaskStatus, string> = {
  [TaskStatus.Upcoming]: 'Not Started',
  [TaskStatus.Active]: 'Active',
  [TaskStatus.Completed]: 'Completed',
  [TaskStatus.Cancelled]: 'Cancelled',
  [TaskStatus.Delayed]: 'Delayed',
  [TaskStatus.Postponed]: 'Postponed',
  [TaskStatus.Late]: 'Late'
};

// Task status colors for display
export const TaskStatusColors: Record<TaskStatus, string> = {
  [TaskStatus.Upcoming]: 'secondary',
  [TaskStatus.Active]: 'primary',
  [TaskStatus.Completed]: 'success',
  [TaskStatus.Cancelled]: 'secondary',
  [TaskStatus.Delayed]: 'warning',
  [TaskStatus.Postponed]: 'info',
  [TaskStatus.Late]: 'danger'
};

interface TaskGroup {
  id: string;
  name: string;
  tasks: ExtendedTask[];
  collapsed: boolean;
}

interface ExtendedTask extends ProjectTask {
  projectId: number;
  projectName: string;
  phaseId: number;
  phaseName: string;
  dueDate?: Date;
  categoryName?: string;
  categoryId?: number;
}

interface TaskCategory {
  id: number;
  name: string;
  count: number;
}

@Component({
  selector: 'app-dash-tasks',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './dash-tasks.component.html',
  styleUrl: './dash-tasks.component.scss'
})
export class DashTasksComponent implements OnInit {
  projectService = inject(ProjectService);
  projectTaskService = inject(ProjectTaskService);
  
  // Loading state
  loading = signal<Record<number, boolean>>({});
  
  // Task filtering state
  filterState = signal<'all' | TaskStatus.Active | TaskStatus.Late | TaskStatus.Completed>(
    'all'
  );
  searchQuery = signal<string>('');
  selectedCategoryId = signal<number | null>(null);
  categoryDrawer = signal(false);
  showCompleted = signal(true); // Default to showing completed tasks
  
  // Collapsed state for categories
  collapsedCategories = signal<Record<string, boolean>>({});
  
  // Make enum available to the template
  TaskStatus = TaskStatus;
  
  // User's active projects with tasks
  userProjects = computed(() => this.projectService.allActiveProjectsByUser());
  
  // All tasks from user's projects - flattened
  allTasks = computed(() => {
    const projects = this.userProjects();
    
    const tasks: ExtendedTask[] = [];
    
    for (const project of projects) {
      for (const phase of project.projectPhases) {
        for (const task of phase.projectTasks) {
          // Skip phases with no tasks
          if (phase.projectTasks.length === 0) continue;
          
          const dueDate = new Date(task.endDate);

          // Get all categories assigned to this task
          const taskCategories = task.projectTaskCategories || [];
          // Use the first category for display purposes if available
          const primaryCategory = taskCategories.length > 0 ? taskCategories[0] : null;
          
          tasks.push({
            ...task,
            projectId: project.id,
            projectName: project.name,
            phaseId: phase.id,
            phaseName: phase.name,
            dueDate,
            categoryName: primaryCategory?.name || 'Uncategorized',
            categoryId: primaryCategory?.id || 0
          });
        }
      }
    }
    
    return tasks;
  });

  // Get all available task categories from project phases and tasks
  taskCategories = computed(() => {
    const projects = this.userProjects();
    const allTasks = this.allTasks();
    const categoriesMap = new Map<string, TaskCategory>();
    
    // Collect all unique categories from all tasks' projectTaskCategories
    for (const project of projects) {
      for (const phase of project.projectPhases) {
        for (const task of phase.projectTasks) {
          // Check if the task has categories
          if (task.projectTaskCategories && task.projectTaskCategories.length > 0) {
            for (const category of task.projectTaskCategories) {
              // Skip empty categories
              if (!category || !category.name || !category.id) continue;
              
              const categoryKey = `category-${category.id}`;
              
              if (!categoriesMap.has(categoryKey)) {
                categoriesMap.set(categoryKey, {
                  id: category.id,
                  name: category.name,
                  count: 0
                });
              }
            }
          }
        }
      }
    }
    
    // Count tasks for each category
    for (const task of allTasks) {
      if (task.categoryId && task.categoryId !== 0) {
        const categoryKey = `category-${task.categoryId}`;
        if (categoriesMap.has(categoryKey)) {
          const category = categoriesMap.get(categoryKey);
          if (category) {
            category.count += 1;
          }
        }
      }
    }
    
    // Add "All Categories" option at the beginning
    const result = [
      {
        id: 0,
        name: 'All Categories',
        count: allTasks.length
      },
      ...Array.from(categoriesMap.values())
    ];
    
    console.log(`Found ${categoriesMap.size} categories (excluding 'All Categories')`);
    
    return result;
  });
  
  // Filtered tasks based on current filter state
  filteredTasks = computed(() => {
    const tasks = this.allTasks();
    const filterState = this.filterState();
    const searchQuery = this.searchQuery().toLowerCase();
    const categoryId = this.selectedCategoryId();
    const showCompleted = this.showCompleted();
    
    // Apply search filter if present
    let filtered = searchQuery
      ? tasks.filter(task => 
          task.name.toLowerCase().includes(searchQuery) || 
          task.description.toLowerCase().includes(searchQuery))
      : tasks;
    
    // Apply status filter based on the enum values
    if (filterState !== 'all') {
      filtered = filtered.filter(task => task.status === filterState);
    }

    // Apply category filter
    if (categoryId !== null && categoryId !== 0) {
      filtered = filtered.filter(task => task.categoryId === categoryId);
    }
    
    // Filter out completed tasks if showCompleted is false
    if (!showCompleted) {
      filtered = filtered.filter(task => task.status !== TaskStatus.Completed);
    }
    
    return filtered;
  });
  
  // Tasks grouped by project and phase
  groupedTasks = computed(() => {
    const tasks = this.filteredTasks();
    const groups: TaskGroup[] = [];
    
    // Group by project
    const projectMap = new Map<number, ExtendedTask[]>();
    
    tasks.forEach(task => {
      if (!projectMap.has(task.projectId)) {
        projectMap.set(task.projectId, []);
      }
      projectMap.get(task.projectId)?.push(task);
    });
    
    // Convert map to array of task groups
    projectMap.forEach((tasks, projectId) => {
      const projectName = tasks[0]?.projectName || 'Unknown Project';
      
      // Group by phase within project
      const phaseMap = new Map<number, ExtendedTask[]>();
      
      tasks.forEach(task => {
        if (!phaseMap.has(task.phaseId)) {
          phaseMap.set(task.phaseId, []);
        }
        phaseMap.get(task.phaseId)?.push(task);
      });
      
      // Convert phase map to task groups
      phaseMap.forEach((phaseTasks, phaseId) => {
        const phaseName = phaseTasks[0]?.phaseName || 'Unknown Phase';
        const groupId = `project-${projectId}-phase-${phaseId}`;
        
        // Skip if no tasks in phase (shouldn't happen due to earlier filtering)
        if (phaseTasks.length === 0) return;
        
        // Get collapsed state from signal or default to false
        const isCollapsed = this.collapsedCategories()[groupId] || false;
        
        groups.push({
          id: groupId,
          name: `${projectName} - ${phaseName}`,
          tasks: phaseTasks,
          collapsed: isCollapsed
        });
      });
    });
    
    return groups;
  });
  
  // Task counts
  taskCounts = computed(() => {
    const allTasks = this.allTasks();
    const all = allTasks.length;
    const active = allTasks.filter(t => t.status === TaskStatus.Active).length;
    const late = allTasks.filter(t => t.status === TaskStatus.Late).length;
    const completed = allTasks.filter(t => t.status === TaskStatus.Completed).length;
    
    return { all, active, late, completed };
  });
  
  public readonly selectedCategoryName = computed(() => {
    if (this.selectedCategoryId() === null || this.selectedCategoryId() === 0) {
      return 'All Categories';
    }
    
    const category = this.taskCategories().find(c => c.id === this.selectedCategoryId());
    return category?.name || 'Category';
  });
  
  ngOnInit(): void {
    // Make sure project data is loaded
    this.projectService.getAllProjectsResource.reload();
  }
  
  toggleFilter(filter: 'all' | TaskStatus.Active | TaskStatus.Late | TaskStatus.Completed): void {
    this.filterState.set(filter);
  }
  
  updateSearch(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.searchQuery.set(input.value);
  }

  setTaskCategory(categoryId: number | null): void {
    this.selectedCategoryId.set(categoryId);
  }
  
  clearCategoryFilter(): void {
    this.selectedCategoryId.set(null);
  }
  
  toggleCategoryDrawer(): void {
    this.categoryDrawer.update(value => !value);
    
    // Handle the Bootstrap offcanvas manually
    const offcanvasElement = document.getElementById('categoryDrawer');
    if (offcanvasElement) {
      if (this.categoryDrawer()) {
        offcanvasElement.classList.add('show');
        document.body.classList.add('overflow-hidden');
        
        // Add backdrop if it doesn't exist
        if (!document.querySelector('.offcanvas-backdrop')) {
          const backdrop = document.createElement('div');
          backdrop.classList.add('offcanvas-backdrop', 'fade', 'show');
          document.body.appendChild(backdrop);
          
          // Add click handler to backdrop
          backdrop.addEventListener('click', () => {
            this.closeCategoryDrawer();
          });
        }
      } else {
        this.closeCategoryDrawer();
      }
    }
  }
  
  closeCategoryDrawer(): void {
    this.categoryDrawer.set(false);
    
    // Handle the Bootstrap offcanvas manually
    const offcanvasElement = document.getElementById('categoryDrawer');
    if (offcanvasElement) {
      offcanvasElement.classList.remove('show');
      document.body.classList.remove('overflow-hidden');
      
      // Remove backdrop
      const backdrop = document.querySelector('.offcanvas-backdrop');
      if (backdrop) {
        backdrop.remove();
      }
    }
  }
  
  toggleShowCompleted(): void {
    this.showCompleted.update(value => !value);
  }
  
  toggleCollapse(groupId: string): void {
    const currentState = this.collapsedCategories();
    this.collapsedCategories.set({
      ...currentState,
      [groupId]: !currentState[groupId]
    });
  }
  
  /**
   * Mark a task as complete or incomplete
   * @param task The task to update
   */
  completeTask(task: ExtendedTask): void {
    // Set loading state for this task
    this.loading.update(state => ({
      ...state,
      [task.id]: true
    }));
    
    // Use the service to mark task as complete
    this.projectTaskService.completeProjectTask(task.id).subscribe({
      next: () => {
        // Reload the data to refresh the UI
        this.projectService.getAllProjectsResource.reload();
        
        // Clear loading state
        this.loading.update(state => ({
          ...state,
          [task.id]: false
        }));
      },
      error: (error) => {
        console.error('Error updating task:', error);
        
        // Clear loading state
        this.loading.update(state => ({
          ...state,
          [task.id]: false
        }));
      }
    });
  }
  
  getStatusClass(status: number): string {
    return `status-${TaskStatusColors[status as TaskStatus] || 'secondary'}`;
  }
  
  getStatusText(status: number): string {
    return TaskStatusLabels[status as TaskStatus] || 'Unknown';
  }
  
  formatDate(date: Date): string {
    if (!date) return '';
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric'
    });
  }
}
