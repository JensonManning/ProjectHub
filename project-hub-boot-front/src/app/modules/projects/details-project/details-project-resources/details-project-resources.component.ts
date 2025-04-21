import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProjectService } from '../../../../core/services/project/project.service';
import { ProjectResource } from '../../../../core/interfaces/project/project-resource.interface';

@Component({
  selector: 'app-details-project-resources',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="container-fluid mt-3">
      <!-- Resource Count & Stats -->
      <div class="card mb-4">
        <div class="card-body">
          <div class="d-flex justify-content-between align-items-center">
            <h5 class="mb-0">Project Resources ({{projectResources().length}})</h5>
            <div>
              <!-- Resource stats could go here -->
            </div>
          </div>
        </div>
      </div>

      @if (projectResources().length === 0) {
        <div class="card">
          <div class="card-body text-center p-5">
            <div class="mb-3">
              <i class="bi bi-people fs-1 text-muted"></i>
            </div>
            <h5>No resources assigned</h5>
            <p class="text-muted">
              This project doesn't have any resources assigned yet.
            </p>
          </div>
        </div>
      } @else {
        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          @for (resource of projectResources(); track resource.id) {
            <div class="col">
              <div class="card h-100 resource-card">
                <div class="card-body">
                  <!-- Resource Header -->
                  <div class="d-flex align-items-center mb-3">
                    <div class="resource-avatar me-3">
                      <div class="avatar-placeholder bg-primary text-white">
                        {{ getInitials(resource.user?.name || resource.name) }}
                      </div>
                    </div>
                    <div>
                      <h5 class="card-title mb-0">{{ resource.name }}</h5>
                      <p class="text-muted mb-0">
                        {{ resource.user?.role?.name || 'No role assigned' }}
                      </p>
                    </div>
                  </div>

                  <!-- Resource Details -->
                  <div class="mb-3">
                    <div *ngIf="resource.description" class="mb-3">
                      <p class="mb-0">{{ resource.description }}</p>
                    </div>
                    
                    @if (resource.user) {
                      <div class="resource-user-details">
                        <div class="mb-2">
                          <i class="bi bi-envelope text-muted me-2"></i>
                          <a href="mailto:{{ resource.user.email }}">{{ resource.user.email }}</a>
                        </div>
                        @if (resource.user.phone) {
                          <div>
                            <i class="bi bi-telephone text-muted me-2"></i>
                            <a href="tel:{{ resource.user.phone }}">{{ resource.user.phone }}</a>
                          </div>
                        }
                      </div>
                    }
                  </div>

                  <!-- Resource Stats -->
                  <div class="resource-stats text-muted">
                    <div class="d-flex justify-content-between">
                      <span>
                        <i class="bi bi-list-task me-1"></i>
                        {{ getResourceTasksCount(resource) }} Tasks
                      </span>
                      <span>
                        <i class="bi bi-check-circle me-1"></i>
                        {{ getCompletedTasksCount(resource) }} Completed
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          }
        </div>
      }
    </div>
  `,
  styles: [`
    .resource-card {
      transition: transform 0.2s;
      
      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
      }
    }
    
    .avatar-placeholder {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 48px;
      height: 48px;
      border-radius: 50%;
      font-size: 1.25rem;
      font-weight: 500;
    }
    
    .resource-stats {
      border-top: 1px solid rgba(0, 0, 0, 0.1);
      padding-top: 1rem;
      font-size: 0.875rem;
    }
  `]
})
export class DetailsProjectResourcesComponent {
  projectService = inject(ProjectService);
  
  // Get resources from the selected project
  projectResources = computed((): ProjectResource[] => {
    return this.projectService.projectDetails()?.projectResources || [];
  });
  
  /**
   * Get initials from a name
   */
  getInitials(name: string): string {
    if (!name) return '?';
    
    return name
      .split(' ')
      .map(part => part.charAt(0))
      .join('')
      .toUpperCase()
      .substring(0, 2);
  }
  
  /**
   * Get the count of tasks assigned to a resource
   */
  getResourceTasksCount(resource: ProjectResource): number {
    let count = 0;
    
    // Get all phases in the project
    const phases = this.projectService.projectDetails()?.projectPhases || [];
    
    // Count tasks assigned to this resource across all phases
    phases.forEach(phase => {
      phase.projectTasks.forEach(task => {
        if (task.projectTaskResources?.some(tr => tr.projectResourceId === resource.id)) {
          count++;
        }
      });
    });
    
    return count;
  }
  
  /**
   * Get the count of completed tasks assigned to a resource
   */
  getCompletedTasksCount(resource: ProjectResource): number {
    let count = 0;
    
    // Get all phases in the project
    const phases = this.projectService.projectDetails()?.projectPhases || [];
    
    // Count completed tasks assigned to this resource across all phases
    phases.forEach(phase => {
      phase.projectTasks.forEach(task => {
        if (task.status === 2 && task.projectTaskResources?.some(tr => tr.projectResourceId === resource.id)) {
          count++;
        }
      });
    });
    
    return count;
  }
} 