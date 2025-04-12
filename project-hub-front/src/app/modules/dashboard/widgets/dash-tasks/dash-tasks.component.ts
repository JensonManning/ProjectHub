import { Project } from '@/core/interfaces/project/project.interface';
import { ProjectService } from '@/core/services/project/project.service';
import { CommonModule } from '@angular/common';
import { Component, computed, effect, inject, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import {
  injectMutation,
  injectQuery,
  QueryClient
} from '@tanstack/angular-query-experimental'
import { FieldsetModule } from 'primeng/fieldset';
import { AccordionModule } from 'primeng/accordion';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { BadgeModule } from 'primeng/badge';
import { DividerModule } from 'primeng/divider';
import { DrawerModule } from 'primeng/drawer';
import { FluidModule } from 'primeng/fluid';
import { TableModule } from 'primeng/table';
import { TagModule } from 'primeng/tag';
import { TooltipModule } from 'primeng/tooltip';
import { TaskStatus, TaskStatusLabels, TaskStatusColors } from '@/core/interfaces/project/project-task-status.enum';
import { ProjectPhase } from '@/core/interfaces/project/project-phase.interface';

@Component({
  selector: 'app-dash-tasks',
  imports: [
    RouterModule, 
    CommonModule, 
    FieldsetModule, 
    AccordionModule, 
    AvatarModule,
    ButtonModule,
    BadgeModule,
    DividerModule,
    DrawerModule,
    FluidModule,
    TableModule,
    TagModule,
    TooltipModule
  ],
  templateUrl: './dash-tasks.component.html',
  styleUrl: './dash-tasks.component.scss'
})
export class DashTasksComponent {
  projectService = inject(ProjectService);
  queryClient = inject(QueryClient);

  // State
  categoryDrawer = signal(false);
  filterText = signal('');
  statusFilter = signal<TaskStatus | 'all'>('all');
  categoryFilter = signal<number | 'all'>('all');

  // Make enums available to the template
  TaskStatus = TaskStatus;
  TaskStatusLabels = TaskStatusLabels;
  TaskStatusColors = TaskStatusColors;

  allProjectQuery = injectQuery(() => ({
    queryKey: ['projects'],
    queryFn: () => this.projectService.getAllUserProjects()
  }))

  // Computed properties for filtering
  allTasks = computed(() => {
    const projects = this.allProjectQuery.data() || [];
    return projects.flatMap(project => 
      project.projectPhases.flatMap(phase => 
        phase.projectTasks.map(task => ({
          ...task,
          projectName: project.name,
          phaseName: phase.name
        }))
      )
    ).filter(task => this.matchesFilters(task));
  });

  allUnfilteredTasks = computed(() => {
    const projects = this.allProjectQuery.data() || [];
    return projects.flatMap(project => 
      project.projectPhases.flatMap(phase => 
        phase.projectTasks.map(task => ({
          ...task,
          projectName: project.name,
          phaseName: phase.name
        }))
      )
    );
  });

  activeTasks = computed(() => 
    this.allUnfilteredTasks().filter(task => task.status === TaskStatus.Active)
  );

  lateTasks = computed(() => 
    this.allUnfilteredTasks().filter(task => task.status === TaskStatus.Late)
  );

  allCompletedTasks = computed(() => 
    this.allUnfilteredTasks().filter(task => task.status === TaskStatus.Completed)
  );

  // Filter methods
  matchesFilters(task: any): boolean {
    const matchesStatus = this.statusFilter() === 'all' || task.status === this.statusFilter();
    const matchesText = !this.filterText() || 
      task.name.toLowerCase().includes(this.filterText().toLowerCase()) ||
      task.description?.toLowerCase().includes(this.filterText().toLowerCase());
    const matchesCategory = this.categoryFilter() === 'all' || 
      task.projectTaskCategory?.id === this.categoryFilter();

    return matchesStatus && matchesText && matchesCategory;
  }

  getFilteredTasksForPhase(phase: ProjectPhase): any[] {
    return phase.projectTasks.filter(task => this.matchesFilters(task));
  }

  filterByStatus(status: TaskStatus | 'all'): void {
    this.statusFilter.set(status);
  }

  clearStatusFilter(): void {
    this.statusFilter.set('all');
  }

  clearCategoryFilter(): void {
    this.categoryFilter.set('all');
  }

  toggleCategoryDrawer(): void {
    this.categoryDrawer.set(!this.categoryDrawer());
  }

  // Status methods
  getStatusSeverity(status: TaskStatus): 'success' | 'info' | 'warn' | 'danger' | 'secondary' | 'contrast' {
    switch (status) {
      case TaskStatus.Completed:
        return 'success';
      case TaskStatus.Active:
        return 'info';
      case TaskStatus.Late:
        return 'danger';
      case TaskStatus.Delayed:
        return 'warn';
      case TaskStatus.Cancelled:
        return 'secondary';
      default:
        return 'contrast';
    }
  }

  getStatusLabel(status: TaskStatus): string {
    return TaskStatusLabels[status] || 'Unknown';
  }

  ngOnInit(): void {
    this.projectService.getAllProjectsResource.reload();
    this.allProjectQuery.refetch();
  }
}
