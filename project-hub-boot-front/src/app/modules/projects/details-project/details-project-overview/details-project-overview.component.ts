import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../../../../core/services/project/project.service';
import { ProjectPhase } from '../../../../core/interfaces/project/project-phase.interface';

@Component({
  selector: 'app-details-project-overview',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container-fluid mt-3">
      <!-- Project Header -->
      <div class="row mb-4">
        <div class="col-12">
          <div class="card shadow-sm">
            <div class="card-body d-flex align-items-center">
              <div>
                <h2 class="mb-1">{{projectService.projectDetails().name}}</h2>
                <span class="text-muted">{{projectService.projectDetails().shortcode}}</span>
              </div>
              <span class="ms-auto badge" 
                    [ngClass]="getProjectStatusClass()">
                {{getProjectStatusLabel()}}
              </span>
            </div>
          </div>
        </div>
      </div>

      <!-- Project Details -->
      <div class="row mb-4">
        <div class="col-12">
          <div class="card shadow-sm">
            <div class="card-header">
              <h5 class="mb-0">Project Details</h5>
            </div>
            <div class="card-body">
              <div class="row mb-3">
                <div class="col-md-3 text-muted">Description:</div>
                <div class="col-md-9">{{projectService.projectDetails().description || 'No description available'}}</div>
              </div>
              <div class="row mb-3">
                <div class="col-md-3 text-muted">Start Date:</div>
                <div class="col-md-9">{{projectService.projectDetails().startDate | date:'MMM d, yyyy'}}</div>
              </div>
              <div class="row mb-3">
                <div class="col-md-3 text-muted">End Date:</div>
                <div class="col-md-9">{{projectService.projectDetails().endDate | date:'MMM d, yyyy'}}</div>
              </div>
              <div class="row mb-3">
                <div class="col-md-3 text-muted">Type:</div>
                <div class="col-md-9">{{getProjectTypeLabel()}}</div>
              </div>
              <div class="row mb-3">
                <div class="col-md-3 text-muted">Status:</div>
                <div class="col-md-9">{{getProjectStatusLabel()}}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Current Phase Card -->
      <div class="row mb-4">
        <div class="col-12">
          <div class="card shadow-sm">
            <div class="card-header">
              <h5 class="mb-0">Current Phase</h5>
            </div>
            <div class="card-body">
              @if (currentPhase(); as phase) {
                <div class="d-flex align-items-center mb-3">
                  <h4 class="mb-0 text-primary">{{phase.name}}</h4>
                  <span class="ms-auto badge" 
                        [ngClass]="getPhaseStatusClass(phase)">
                    {{getPhaseStatusLabel(phase)}}
                  </span>
                </div>
                <div class="row mb-3">
                  <div class="col-md-3 text-muted">Description:</div>
                  <div class="col-md-9">{{phase.description || 'No description available'}}</div>
                </div>
                <div class="row mb-3">
                  <div class="col-md-3 text-muted">Start Date:</div>
                  <div class="col-md-9">{{phase.startDate | date:'MMM d, yyyy'}}</div>
                </div>
                <div class="row mb-3">
                  <div class="col-md-3 text-muted">End Date:</div>
                  <div class="col-md-9">{{phase.endDate | date:'MMM d, yyyy'}}</div>
                </div>
                <div class="mb-1 text-muted">Phase Progress:</div>
                <div class="progress">
                  <div class="progress-bar" 
                       [ngClass]="getProgressBarClass(getPhaseProgress(phase))" 
                       role="progressbar" 
                       [style.width.%]="getPhaseProgress(phase)" 
                       [attr.aria-valuenow]="getPhaseProgress(phase)" 
                       aria-valuemin="0" 
                       aria-valuemax="100">
                    {{getPhaseProgress(phase)}}%
                  </div>
                </div>
              } @else {
                <div class="text-center py-4">
                  <i class="bi bi-info-circle text-primary fs-1 mb-3"></i>
                  <p>No active phases available</p>
                </div>
              }
            </div>
          </div>
        </div>
      </div>

      <!-- Tasks Overview Card -->
      <div class="row mb-4">
        <div class="col-12">
          <div class="card shadow-sm">
            <div class="card-header">
              <h5 class="mb-0">Tasks Overview</h5>
            </div>
            <div class="card-body">
              <div class="row text-center mb-4">
                <div class="col-6">
                  <div class="fs-3 fw-bold text-success mb-1">{{completedTasks()}}</div>
                  <div class="text-muted">Completed</div>
                </div>
                <div class="col-6">
                  <div class="fs-3 fw-bold text-warning mb-1">{{openTasks()}}</div>
                  <div class="text-muted">Open</div>
                </div>
              </div>

              <div class="mb-3">
                <div class="mb-1 text-muted">Task Completion:</div>
                <div class="progress">
                  <div class="progress-bar" 
                       [ngClass]="getProgressBarClass(getTasksProgress())" 
                       role="progressbar" 
                       [style.width.%]="getTasksProgress()" 
                       [attr.aria-valuenow]="getTasksProgress()" 
                       aria-valuemin="0" 
                       aria-valuemax="100">
                    {{getTasksProgress()}}%
                  </div>
                </div>
              </div>

              <div>
                <div class="mb-2 text-muted">Task Status Breakdown:</div>
                <div class="d-flex flex-wrap gap-2">
                  <span class="badge bg-info">Upcoming: {{getTasksByStatus(0)}}</span>
                  <span class="badge bg-warning">Active: {{getTasksByStatus(1)}}</span>
                  <span class="badge bg-success">Completed: {{getTasksByStatus(2)}}</span>
                  <span class="badge bg-danger">Delayed: {{getTasksByStatus(4)}}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class DetailsProjectOverviewComponent {
  projectService = inject(ProjectService);

  completedTasks = computed(() => {
    return this.projectService.projectDetails()?.projectPhases?.reduce((acc, phase) => {
      return acc + phase.projectTasks.filter(t => t.status === 2).length;
    }, 0) ?? 0;
  });

  openTasks = computed(() => {
    return this.projectService.projectDetails()?.projectPhases?.reduce((acc, phase) => { 
      return acc + phase.projectTasks?.filter(t => t.status !== 2).length; 
    }, 0) ?? 0;
  });

  currentPhase = computed(() => {
    const phases = this.projectService.projectDetails()?.projectPhases || [];
    if (!phases.length) return null;
    
    // Find the active phase (status 1)
    const activePhase = phases.find(p => p.status === 1);
    if (activePhase) return activePhase;
    
    // If no active phase, get the upcoming phase with the earliest start date
    const upcomingPhases = phases.filter(p => p.status === 0);
    if (upcomingPhases.length) {
      return upcomingPhases.sort((a, b) => 
        new Date(a.startDate).getTime() - new Date(b.startDate).getTime()
      )[0];
    }
    
    // If no upcoming phases, return the most recently completed phase
    return phases
      .filter(p => p.status === 2)
      .sort((a, b) => 
        new Date(b.endDate).getTime() - new Date(a.endDate).getTime()
      )[0] || phases[0];
  });

  getTasksByStatus(status: number): number {
    return this.projectService.projectDetails()?.projectPhases?.reduce((acc, phase) => {
      return acc + phase.projectTasks.filter(t => t.status === status).length;
    }, 0) ?? 0;
  }

  getTasksProgress(): number {
    const total = this.completedTasks() + this.openTasks();
    if (total === 0) return 0;
    return Math.round((this.completedTasks() / total) * 100);
  }
  
  getPhaseProgress(phase: ProjectPhase | null): number {
    if (!phase) return 0;
    
    const today = new Date();
    const startDate = new Date(phase.startDate);
    const endDate = new Date(phase.endDate);
    
    // If today is before start date, return 0%
    if (today < startDate) return 0;
    
    // If today is after end date, return 100%
    if (today > endDate) return 100;
    
    // Calculate the total duration of the phase in milliseconds
    const totalDuration = endDate.getTime() - startDate.getTime();
    
    // Calculate how much time has elapsed since the start date
    const elapsedDuration = today.getTime() - startDate.getTime();
    
    // Calculate the percentage of completion based on elapsed time
    const percentage = Math.round((elapsedDuration / totalDuration) * 100);
    
    // Ensure the percentage is between 0 and 100
    return Math.max(0, Math.min(100, percentage));
  }

  getProgressBarClass(value: number): string {
    if (value < 25) return 'bg-danger';
    if (value < 50) return 'bg-warning';
    if (value < 75) return 'bg-info';
    return 'bg-success';
  }

  getPhaseStatusLabel(phase: ProjectPhase): string {
    if (!phase) return 'Unknown';
    
    switch (phase.status) {
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
    if (!phase) return 'bg-secondary';
    
    switch (phase.status) {
      case 0: return 'bg-info';
      case 1: return 'bg-warning';
      case 2: return 'bg-success';
      case 3: return 'bg-danger';
      case 4: return 'bg-warning';
      case 5: return 'bg-danger';
      case 6: return 'bg-danger';
      default: return 'bg-secondary';
    }
  }

  getProjectStatusLabel(): string {
    const status = this.projectService.projectDetails()?.status;
    
    switch (status) {
      case 0: return 'Unknown';
      case 1: return 'Sale Pending';
      case 2: return 'Upcoming';
      case 3: return 'Active';
      case 4: return 'Completed';
      case 5: return 'Cancelled';
      case 6: return 'Delayed';
      case 7: return 'Postponed';
      case 8: return 'Late';
      default: return 'Unknown';
    }
  }

  getProjectTypeLabel(): string {
    const type = this.projectService.projectDetails()?.type;
    
    switch (type) {
      case 0: return 'Unknown';
      case 1: return 'Cloud Plus';
      case 2: return 'Cloud Only';
      case 3: return 'Merger';
      case 4: return 'Exit';
      default: return 'Unknown';
    }
  }

  getProjectStatusClass(): string {
    const status = this.projectService.projectDetails()?.status;
    
    switch (status) {
      case 0: return 'bg-secondary';      // Unknown
      case 1: return 'bg-info';      // Sale Pending
      case 2: return 'bg-info';      // Upcoming
      case 3: return 'bg-warning';      // Active
      case 4: return 'bg-success';   // Completed
      case 5: return 'bg-danger';    // Cancelled
      case 6: return 'bg-warning';      // Delayed
      case 7: return 'bg-danger';    // Postponed
      case 8: return 'bg-danger';    // Late
      default: return 'bg-secondary';
    }
  }
} 