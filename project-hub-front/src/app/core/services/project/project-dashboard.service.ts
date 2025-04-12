import { Injectable, computed, inject } from '@angular/core';
import { ProjectService } from './project.service';
import { Project } from '@/core/interfaces/project/project.interface';
import { ProjectPhase } from '@/core/interfaces/project/project-phase.interface';
import { ProjectTask } from '@/core/interfaces/project/project-task.interface';

export interface DashboardTaskGroup {
  projectId: number;
  projectName: string;
  phases: {
    phaseId: number;
    phaseName: string;
    tasks: DashboardTask[];
  }[];
}

export interface DashboardTask extends ProjectTask {
  projectId: number;
  projectName: string;
  phaseId: number;
  phaseName: string;
  completed?: boolean; // For compatibility with dash-tasks component
}

@Injectable({
  providedIn: 'root'
})
export class ProjectDashboardService {
  private projectService = inject(ProjectService);

  // Computed signal that transforms projects into grouped tasks
  groupedProjectTasks = computed(() => {
    const projects = this.projectService.allProjects();
    return this.transformProjectsToTaskGroups(projects);
  });

  // Get all tasks across all projects flattened into a single array
  allTasks = computed(() => {
    const groups = this.groupedProjectTasks();
    return groups.flatMap(group => 
      group.phases.flatMap(phase => phase.tasks)
    );
  });

  // Get only completed tasks
  completedTasks = computed(() => {
    return this.allTasks().filter(task => task.status === 2); // Assuming 2 is Completed status
  });

  // Get only active tasks
  activeTasks = computed(() => {
    return this.allTasks().filter(task => task.status === 1); // Assuming 1 is Active status
  });

  private transformProjectsToTaskGroups(projects: Project[]): DashboardTaskGroup[] {
    return projects.map(project => ({
      projectId: project.id,
      projectName: project.name,
      phases: project.projectPhases.map(phase => ({
        phaseId: phase.id,
        phaseName: phase.name,
        tasks: this.transformTasks(project, phase)
      }))
    }));
  }

  private transformTasks(project: Project, phase: ProjectPhase): DashboardTask[] {
    return phase.projectTasks.map(task => ({
      ...task,
      projectId: project.id,
      projectName: project.name,
      phaseId: phase.id,
      phaseName: phase.name,
      completed: task.status === 2 
    }));
  }
} 